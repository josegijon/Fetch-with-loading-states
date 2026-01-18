import { useCallback, useEffect, useState } from "react"
import { DataList } from "./DataList"
import type { PokemonWithDetails } from "../types/pokemon.types";
import { fetchPokemonDetails } from "../utils/pokemonApi";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ErrorMessage } from "./ErrorMessage";
import { Pagination } from "./Pagination";
import { scrollToTop } from "../utils/scrollUtils";
import { PokemonHeader } from "./PokemonHeader";
import { PokemonFooter } from "./PokemonFooter";
import { usePokemonData } from "../hooks/usePokemonData";
import { POKEMON_PER_PAGE } from "../constants/pokemonApp";

export const PokemonApp = () => {

    const [filteredPokemons, setFilteredPokemons] = useState<PokemonWithDetails[]>([]);
    const [searchResults, setSearchResults] = useState<PokemonWithDetails[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchPage, setSearchPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    const publishPokemons = (pokemons: PokemonWithDetails[]) => {
        setFilteredPokemons(pokemons);
    };


    const { allPokemonNames, loading, error, fetchPokemonNames, fetchPagePokemons } = usePokemonData(publishPokemons);

    const loadingState = loading || searchLoading;
    const errorState = error || searchError;

    // Load names
    useEffect(() => {
        fetchPokemonNames();
    }, []);

    // Load first page
    useEffect(() => {
        if (allPokemonNames.length > 0 && filteredPokemons.length === 0 && !searchQuery) {
            fetchPagePokemons(1, allPokemonNames);
        }
    }, [allPokemonNames, fetchPagePokemons, filteredPokemons.length, searchQuery]);

    // Page change
    useEffect(() => {
        if (allPokemonNames.length > 0 && !searchQuery) {
            fetchPagePokemons(currentPage, allPokemonNames);
        }
    }, [currentPage, allPokemonNames, fetchPagePokemons, searchQuery]);

    // Scroll
    useEffect(() => {
        scrollToTop();
    }, [currentPage, searchPage]);


    const handleRetry = () => {
        if (searchQuery) {
            handleSearch(searchQuery);
        } else {
            fetchPagePokemons(currentPage, allPokemonNames);
        }
    };

    const handleSearch = useCallback(async (query: string) => {
        setSearchQuery(query);
        const trimmedQuery = query.trim().toLowerCase();

        if (!trimmedQuery) {
            setSearchResults([]);
            setSearchPage(1);
            fetchPagePokemons(currentPage, allPokemonNames);
            return;
        }

        const matchingNames = allPokemonNames.filter(p =>
            p.name.toLowerCase().includes(trimmedQuery)
        );

        const toFetch = matchingNames.slice(0, 500);

        setSearchLoading(true);

        try {
            const detailsPromises = toFetch.map(p => fetchPokemonDetails(p.url));
            const results = await Promise.all(detailsPromises);

            setSearchResults(results);
            setSearchPage(1);

            setFilteredPokemons(results.slice(0, POKEMON_PER_PAGE));
        } catch (err) {
            setSearchError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setSearchLoading(false);
        }
    }, [
        allPokemonNames,
        fetchPagePokemons,
        POKEMON_PER_PAGE
    ]
    );

    const handleSearchPageChange = (page: number) => {
        setSearchPage(page);

        const startIndex = (page - 1) * POKEMON_PER_PAGE;
        const endIndex = startIndex + POKEMON_PER_PAGE;
        const pageResults = searchResults.slice(startIndex, endIndex);

        setFilteredPokemons(pageResults);
    };


    return (
        <div className="bg-gradient flex-col gap-4 w-full">
            {/* Header and SearchBar */}
            <PokemonHeader onSearch={handleSearch} />

            {/* Loading layout */}
            {loadingState && (
                <LoadingSkeleton />
            )}

            {/* Error layout */}
            {errorState && (
                <ErrorMessage message={error || 'An error occurred'} onRetry={handleRetry} />
            )}

            {/* List */}
            {!errorState && !loadingState && (
                <DataList
                    pokemons={filteredPokemons}
                />
            )}

            {/* Message without results */}
            {filteredPokemons.length === 0 && !loadingState &&
                (
                    <p className="text-center text-slate-400 mt-8">
                        No Pokémon found matching "{searchQuery}"
                    </p>
                )
            }

            {/* Pagination */}
            {!loadingState && !errorState && (
                <>
                    {searchQuery ? (
                        // Search
                        <Pagination
                            currentPage={searchPage}
                            totalItems={searchResults.length}
                            itemsPerPage={POKEMON_PER_PAGE}
                            onPageChange={handleSearchPageChange}
                        />
                    ) : (
                        // Normal
                        <Pagination
                            currentPage={currentPage}
                            totalItems={allPokemonNames.length}
                            itemsPerPage={POKEMON_PER_PAGE}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            )}

            {searchQuery && !loadingState && (
                <p className="text-center text-slate-400 pb-4">
                    Found {searchResults.length} Pokémon matching "{searchQuery}"
                </p>
            )}

            {/* Footer */}
            <PokemonFooter />
        </div>
    )
}