import type { PokemonWithDetails } from "../types/pokemon.types"

interface Props {
    pokemon: PokemonWithDetails;
}

const TYPE_COLORS: Record<string, string> = {
    normal: "bg-gray-400",
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-400',
    ice: 'bg-cyan-300',
    fighting: 'bg-orange-600',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-700',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-500',
    rock: 'bg-stone-500',
    ghost: 'bg-violet-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-800',
    steel: 'bg-slate-400',
    fairy: 'bg-pink-300',
};


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
                        className={`rounded-2xl px-3 py-2 ${TYPE_COLORS[type]}`}
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
