import type { PokemonWithDetails } from "../types/pokemon.types";
import { DataCard } from "./DataCard";

interface Props {
    pokemons: PokemonWithDetails[];
}

export const DataList = ({ pokemons }: Props) => {
    return (
        <ul className="flex flex-col items-center justify-center gap-4 w-full sm:flex-row sm:flex-wrap sm:px-6">
            {pokemons.map((pokemon) => (
                <DataCard
                    key={pokemon.id}
                    pokemon={pokemon}
                />
            ))}
        </ul>
    )
}
