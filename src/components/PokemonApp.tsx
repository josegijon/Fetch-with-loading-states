import { useEffect, useState } from "react"
import { DataList } from "./DataList"
import type { PokemonBasic, PokemonWithDetails } from "../types/pokemon.types";
import { fetchPokemonDetails } from "../utils/pokemonApi";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ErrorMessage } from "./ErrorMessage";

export const PokemonApp = () => {
    const [pokemons, setPokemons] = useState<PokemonWithDetails[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPokemons = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const basicList: PokemonBasic[] = data.results;

            const detailsPromises = basicList.map(pokemon =>
                fetchPokemonDetails(pokemon.url)
            );

            const pokemonsWithDetails = await Promise.all(detailsPromises);
            setPokemons(pokemonsWithDetails);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPokemons();
    }, [])

    const handleRetry = () => {
        fetchPokemons();
    };

    if (loading) {
        return (
            <div className="bg-gradient flex-col gap-4">
                <div className="flex flex-col items-center gap-3">
                    <h1 className="text-4xl font-bold text-center mb-8">
                        Pokédex Explorer
                    </h1>

                    <p className="text-lg font-thin">
                        Explore and search through hundreds of Pokémon
                    </p>

                    <LoadingSkeleton />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gradient">
                <ErrorMessage message={error} onRetry={handleRetry} />
            </div>
        )
    }

    return (
        <div className="bg-gradient flex-col gap-4">
            <div className="flex flex-col items-center gap-3">
                <h1 className="text-4xl font-bold">
                    Pokédex Explorer
                </h1>

                <p className="text-lg font-thin">
                    Explore and search through hundreds of Pokémon
                </p>
            </div>

            <DataList pokemons={pokemons} />
        </div>
    )
}
