import { SearchBar } from "./SearchBar"

interface Props {
    onSearch: (query: string) => void;
}

export const PokemonHeader = ({ onSearch }: Props) => {
    return (
        <header className="w-full rounded border-b border-border-gray p-4 sticky top-0 bg-primary z-10 ">
            <div className="w-full max-w-480 flex flex-col items-center justify-between gap-4 3xs:flex-row mx-auto">
                <h1 className="text-xl font-bold leading-tight tracking-tight 3xs:text-2xl sm:text-3xl">
                    Pokédex Explorer
                </h1>

                <SearchBar onQuery={onSearch} />
            </div>
        </header>
    )
}
