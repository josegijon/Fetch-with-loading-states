import type { PokemonWithDetails } from "../types/pokemon.types"

interface Props {
    pokemon: PokemonWithDetails;
}

export const DataCard = ({ pokemon }: Props) => {
    return (
        <li
            key={pokemon.name}
            className="flex flex-col gap-3 border rounded-xl p-4 transition duration-300 ease-in-out sm:min-w-87.5 sm:max-w-95 sm:flex-1
                    hover:scale-105"
        >
            <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="mx-auto w-32"
            />

            <div className="flex flex-col items-center capitalize">
                <h3 className="text-xl">
                    {pokemon.name}
                </h3>

                <p className="">
                    #{String(pokemon.id).padStart(3, "0")}
                </p>
            </div>

            {/* Types  */}
            <ul className="flex gap-2 items-center justify-center capitalize">
                {pokemon.types.map((type) => (
                    <span
                        key={type}
                        className="bg-red-500 rounded-2xl px-3 py-2"
                    >
                        {type}
                    </span>
                ))}
            </ul>

            {/* Height and weight */}
            <div className="flex gap-2 items-center justify-center w-full">
                <div className="flex flex-col items-center bg-gray-500 p-2 flex-1 rounded-2xl">
                    <p>Height</p>
                    {pokemon.height}m
                </div>
                <div className="flex flex-col items-center bg-gray-500 p-2 flex-1 rounded-2xl">
                    <p>Weight</p>
                    {pokemon.weight}kg
                </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-4">
                <div className="flex gap-2">
                    <span>HP:</span>
                    <span>{pokemon.stats.hp}</span>
                </div>

                <div className="flex gap-2">
                    <span>Attack:</span>
                    <span>{pokemon.stats.attack}</span>
                </div>

                <div className="flex gap-2">
                    <span>Defense:</span>
                    <span>{pokemon.stats.defense}</span>
                </div>
            </div>
        </li>
    )
}
