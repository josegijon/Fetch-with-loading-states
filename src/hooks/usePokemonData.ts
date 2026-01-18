import { useRef, useState } from "react";
import type { PokemonBasic, PokemonWithDetails } from "../types/pokemon.types";
import { fetchPokemonDetails } from "../utils/pokemonApi";
import { POKEMON_PER_PAGE } from "../constants/pokemonApp";

export const usePokemonData = (
    setFilteredPokemons: React.Dispatch<
        React.SetStateAction<PokemonWithDetails[]>
    >
) => {
    const [allPokemonNames, setAllPokemonNames] = useState<PokemonBasic[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const pokemonCacheRef = useRef<Map<string, PokemonWithDetails>>(new Map());

    const fetchPokemonNames = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=3000');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setAllPokemonNames(data.results);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        }
    };

    const fetchPagePokemons = async (page: number, pokemonList: PokemonBasic[]) => {
        setLoading(true);
        setError(null);

        try {
            // Calculate indexes of the current page
            const startIndex = (page - 1) * POKEMON_PER_PAGE;
            const endIndex = startIndex + POKEMON_PER_PAGE;
            const pagePokemons = pokemonList.slice(startIndex, endIndex);

            // Separate those already cached from those that are missing
            const toFetch: PokemonBasic[] = [];
            const fromCache: PokemonWithDetails[] = [];

            pagePokemons.forEach(pokemon => {
                if (pokemonCacheRef.current.has(pokemon.name)) {
                    fromCache.push(pokemonCacheRef.current.get(pokemon.name)!);
                } else {
                    toFetch.push(pokemon);
                }
            });

            // Fetch only the missing ones
            let newPokemons: PokemonWithDetails[] = [];

            if (toFetch.length > 0) {
                const detailsPromises = toFetch.map(p => fetchPokemonDetails(p.url));
                newPokemons = await Promise.all(detailsPromises);

                // Save to cache
                newPokemons.forEach(p => pokemonCacheRef.current.set(p.name, p));
            }

            // Merge cache + new
            const allPagePokemons = [...fromCache, ...newPokemons].sort((a, b) => a.id - b.id);

            setFilteredPokemons(allPagePokemons);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    return {
        allPokemonNames,
        loading,
        error,

        fetchPokemonNames,
        fetchPagePokemons
    }
}
