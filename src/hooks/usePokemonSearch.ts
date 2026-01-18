import { useCallback, useState } from "react";
import type { PokemonBasic, PokemonWithDetails } from "../types/pokemon.types";
import { fetchPokemonDetails } from "../utils/pokemonApi";
import { POKEMON_PER_PAGE } from "../constants/pokemonApp";

type PublishPokemons = (pokemons: PokemonWithDetails[]) => void;

type UsePokemonSearchParams = {
    allPokemonNames: PokemonBasic[];
    publishPokemons: PublishPokemons;
};

export const usePokemonSearch = ({ allPokemonNames, publishPokemons }: UsePokemonSearchParams) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<PokemonWithDetails[]>([]);
    const [searchPage, setSearchPage] = useState(1);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    const handleSearch = useCallback(async (query: string) => {
        const trimmedQuery = query.trim().toLowerCase();
        setSearchQuery(query);
        setSearchError(null);

        if (!trimmedQuery) {
            setSearchResults([]);
            setSearchPage(1);
            publishPokemons([]);
            return;
        }

        const matchingNames = allPokemonNames.filter(p =>
            p.name.toLowerCase().includes(trimmedQuery)
        );

        const toFetch = matchingNames.slice(0, 500);

        setSearchLoading(true);

        try {
            const results = await Promise.all(
                toFetch.map(p => fetchPokemonDetails(p.url))
            );

            setSearchResults(results);
            setSearchPage(1);

            publishPokemons(results.slice(0, POKEMON_PER_PAGE));

        } catch (err) {
            setSearchError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setSearchLoading(false);
        }
    }, [allPokemonNames, publishPokemons]);

    const handleSearchPageChange = useCallback((page: number) => {
        setSearchPage(page);

        const startIndex = (page - 1) * POKEMON_PER_PAGE;
        const endIndex = startIndex + POKEMON_PER_PAGE;

        publishPokemons(searchResults.slice(startIndex, endIndex));
    }, [searchResults, publishPokemons]);

    return {
        searchQuery,
        searchResults,
        searchPage,
        searchLoading,
        searchError,
        handleSearch,
        handleSearchPageChange
    };
};
