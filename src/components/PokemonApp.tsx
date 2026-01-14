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

    // Carga inicial de nombres
    useEffect(() => {
        fetchPokemonNames();
    }, []);

    // Carga inicial de primera página
    useEffect(() => {
        if (allPokemonNames.length > 0 && filteredPokemons.length === 0 && !searchQuery) {
            fetchPagePokemons(1, allPokemonNames);
        }
    }, [allPokemonNames, fetchPagePokemons, filteredPokemons.length, searchQuery]);

    // Cambio de página (solo si no hay búsqueda)
    useEffect(() => {
        if (allPokemonNames.length > 0 && !searchQuery && currentPage > 1) {
            fetchPagePokemons(currentPage, allPokemonNames);
        }
    }, [currentPage, allPokemonNames, fetchPagePokemons, searchQuery]);

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
            fetchPagePokemons(currentPage, allPokemonNames);
            return;
        }

        // Filtrar nombres que coincidan
        const matchingNames = allPokemonNames.filter(p =>
            p.name.toLowerCase().includes(trimmedQuery)
        );

        // Fetch detalles de los que coinciden (máximo 100 para no saturar)
        const toFetch = matchingNames.slice(0, 100);

        setLoading(true);
        try {
            const detailsPromises = toFetch.map(p => fetchPokemonDetails(p.url));
            const results = await Promise.all(detailsPromises);
            setFilteredPokemons(results);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, [currentPage, allPokemonNames]);

    return (
        <div className="bg-gradient flex-col gap-4">
            {/* Header and SearchBar */}
            <div className="flex flex-col items-center gap-3">
                <h1 className="text-4xl font-bold">
                    Pokédex Explorer
                </h1>
                <p className="text-lg font-thin">
                    Explore and search through hundreds of Pokémon
                </p>
                <SearchBar onQuery={handleSearch} />
            </div>

            {loading && (
                <div className="bg-gradient flex-col gap-4">
                    <LoadingSkeleton />
                </div>
            )}

            {error && (
                <div className="bg-gradient">
                    <ErrorMessage message={error} onRetry={handleRetry} />
                </div>
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
            {!searchQuery && (
                <Pagination
                    currentPage={currentPage}
                    totalItems={allPokemonNames.length}
                    itemsPerPage={pokemonsPerPage}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    )
}