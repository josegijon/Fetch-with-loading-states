import { useCallback, useEffect, useState } from "react"
import { DataList } from "./DataList"
import type { PokemonBasic, PokemonWithDetails } from "../types/pokemon.types";
import { fetchPokemonDetails } from "../utils/pokemonApi";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ErrorMessage } from "./ErrorMessage";
import { SearchBar } from './SearchBar';
import { Pagination } from "./Pagination";

export const PokemonApp = () => {

    const [allPokemonNames, setAllPokemonNames] = useState<PokemonBasic[]>([]);
    const [allPokemons, setAllPokemons] = useState<PokemonWithDetails[]>([]);
    const [filteredPokemons, setFilteredPokemons] = useState<PokemonWithDetails[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(20);
    const [pokemonCache, setPokemonCache] = useState<Map<string, PokemonWithDetails>>(new Map());
    const [searchResults, setSearchResults] = useState<PokemonWithDetails[]>([]);
    const [searchPage, setSearchPage] = useState(1);

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

        try {
            // Calculate indexes of the current page
            const startIndex = (page - 1) * pokemonsPerPage;
            const endIndex = startIndex + pokemonsPerPage;
            const pagePokemons = pokemonList.slice(startIndex, endIndex);

            // Separate those already cached from those that are missing
            const toFetch: PokemonBasic[] = [];
            const fromCache: PokemonWithDetails[] = [];

            pagePokemons.forEach(pokemon => {
                if (pokemonCache.has(pokemon.name)) {
                    fromCache.push(pokemonCache.get(pokemon.name)!);
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
                const newCache = new Map(pokemonCache);
                newPokemons.forEach(p => newCache.set(p.name, p));
                setPokemonCache(newCache);
            }

            // Merge cache + new
            const allPagePokemons = [...fromCache, ...newPokemons].sort((a, b) => a.id - b.id);

            setAllPokemons(allPagePokemons);
            setFilteredPokemons(allPagePokemons);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

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
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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

        setLoading(true);

        try {
            const detailsPromises = toFetch.map(p => fetchPokemonDetails(p.url));
            const results = await Promise.all(detailsPromises);

            setSearchResults(results);
            setSearchPage(1);

            setFilteredPokemons(results.slice(0, pokemonsPerPage));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, [
        allPokemonNames,
        fetchPagePokemons,
        pokemonsPerPage
    ]
    );

    const handleSearchPageChange = (page: number) => {
        setSearchPage(page);

        const startIndex = (page - 1) * pokemonsPerPage;
        const endIndex = startIndex + pokemonsPerPage;
        const pageResults = searchResults.slice(startIndex, endIndex);

        setFilteredPokemons(pageResults);
    };


    return (
        <div className="bg-gradient flex-col gap-4 w-full">
            {/* Header and SearchBar */}
            <header className="w-full rounded border-b border-border-gray p-4 sticky top-0 bg-primary z-10 ">
                <div className="w-full max-w-480 flex flex-col items-center justify-between gap-4 3xs:flex-row mx-auto">
                    <h1 className="text-xl font-bold leading-tight tracking-tight 3xs:text-2xl sm:text-3xl">
                        Pokédex Explorer
                    </h1>
                    <SearchBar onQuery={handleSearch} />
                </div>
            </header>

            {/* Loading layout */}
            {loading && (
                <LoadingSkeleton />
            )}

            {/* Error layout */}
            {error && (
                <ErrorMessage message={error} onRetry={handleRetry} />
            )}

            {/* List */}
            {!error && !loading && (
                <DataList
                    pokemons={filteredPokemons}
                />
            )}

            {/* Message without results */}
            {filteredPokemons.length === 0 && !loading &&
                (
                    <p className="text-center text-slate-400 mt-8">
                        No Pokémon found matching "{searchQuery}"
                    </p>
                )
            }

            {/* Pagination */}
            {!loading && !error && (
                <>
                    {searchQuery ? (
                        // Search
                        <Pagination
                            currentPage={searchPage}
                            totalItems={searchResults.length}
                            itemsPerPage={pokemonsPerPage}
                            onPageChange={handleSearchPageChange}
                        />
                    ) : (
                        // Normal
                        <Pagination
                            currentPage={currentPage}
                            totalItems={allPokemonNames.length}
                            itemsPerPage={pokemonsPerPage}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            )}

            {searchQuery && !loading && (
                <p className="text-center text-slate-400 text-sm mt-4">
                    Found {searchResults.length} Pokémon matching "{searchQuery}"
                </p>
            )}

            <footer className="bg-primary w-full mx-auto py-4 border-t border-t-border-gray text-center">
                @ Pokedex Explorer
            </footer>
        </div>
    )
}