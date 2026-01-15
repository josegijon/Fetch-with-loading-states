import type { PokemonWithDetails } from "../types/pokemon.types";
import { DataCard } from "./DataCard";

interface Props {
    pokemons: PokemonWithDetails[];
}

export const DataList = ({ pokemons }: Props) => {
    return (
        <ul className="p-4 flex flex-col items-center justify-center gap-4 w-full max-w-480 xxs:flex-row xxs:flex-wrap">
            {pokemons.map((pokemon) => (
                <DataCard
                    key={pokemon.id}
                    pokemon={pokemon}
                />
            ))}
        </ul>
    )
}
