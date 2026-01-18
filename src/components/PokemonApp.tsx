import { useEffect, useState } from "react"
import { DataList } from "./DataList"
import type { PokemonWithDetails } from "../types/pokemon.types";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ErrorMessage } from "./ErrorMessage";
import { Pagination } from "./Pagination";
import { scrollToTop } from "../utils/scrollUtils";
import { PokemonHeader } from "./PokemonHeader";
import { PokemonFooter } from "./PokemonFooter";
import { usePokemonData } from "../hooks/usePokemonData";
import { POKEMON_PER_PAGE } from "../constants/pokemonApp";
import { usePokemonSearch } from "../hooks/usePokemonSearch";

export const PokemonApp = () => {

    const [filteredPokemons, setFilteredPokemons] = useState<PokemonWithDetails[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const publishPokemons = (pokemons: PokemonWithDetails[]) => {
        setFilteredPokemons(pokemons);
    };

    const { allPokemonNames, loading, error, fetchPokemonNames, fetchPagePokemons } = usePokemonData(publishPokemons);

    const { searchQuery, searchResults, searchPage, searchLoading, searchError, handleSearch, handleSearchPageChange } = usePokemonSearch({ allPokemonNames, publishPokemons });


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