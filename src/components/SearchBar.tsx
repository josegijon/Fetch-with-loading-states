import { useEffect, useState, useRef, type KeyboardEvent } from "react"

interface Props {
    placeholder?: string;
    onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder = 'Search Pokemon', onQuery }: Props) => {
    const [query, setQuery] = useState('');
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeoutId = setTimeout(() => {
            onQuery(query);
        }, 700);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [query]);

    const handleSearch = () => {
        onQuery(query);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    return (
        <div className="flex flex-1 justify-center max-w-md">
            <label className="flex flex-col w-full h-10">
                <div className="group flex w-full flex-1 items-stretch rounded-lg h-full bg-[#283039]">
                    <div className="text-[9cabba] flex items-center justify-center pl-4 rounded-l-lg">
                        <span className="material-symbols-outlined text-xl!">search</span>
                    </div>
                    <input
                        className="flex w-full flex-1 border-none bg-transparent h-full placeholder:text-[#9cabba] px-4 pl-2 text-base font-normal outline-none"
                        type="text"
                        placeholder={placeholder}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </label>
        </div>
    )
}