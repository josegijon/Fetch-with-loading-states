import type { PokemonWithDetails } from "../types/pokemon.types"

interface Props {
    pokemon: PokemonWithDetails;
}

const TYPE_COLORS: Record<string, string> = {
    normal: "bg-gray-400/20",
    fire: 'bg-red-500/20',
    water: 'bg-blue-500/20',
    grass: 'bg-green-500/20',
    electric: 'bg-yellow-400/20',
    ice: 'bg-cyan-300/20',
    fighting: 'bg-orange-600/20',
    poison: 'bg-purple-500/20',
    ground: 'bg-yellow-700/20',
    flying: 'bg-indigo-400/20',
    psychic: 'bg-pink-500/20',
    bug: 'bg-lime-500/20',
    rock: 'bg-stone-500/20',
    ghost: 'bg-violet-700/20',
    dragon: 'bg-indigo-700/20',
    dark: 'bg-gray-800/20',
    steel: 'bg-slate-400/20',
    fairy: 'bg-pink-300/20',
};

const BORDER_COLORS: Record<string, string> = {
    normal: "border-gray-400/20",
    fire: 'border-red-500/20',
    water: 'border-blue-500/20',
    grass: 'border-green-500/20',
    electric: 'border-yellow-400/20',
    ice: 'border-cyan-300/20',
    fighting: 'border-orange-600/20',
    poison: 'border-purple-500/20',
    ground: 'border-yellow-700/20',
    flying: 'border-indigo-400/20',
    psychic: 'border-pink-500/20',
    bug: 'border-lime-500/20',
    rock: 'border-stone-500/20',
    ghost: 'border-violet-700/20',
    dragon: 'border-indigo-700/20',
    dark: 'border-gray-800/20',
    steel: 'border-slate-400/20',
    fairy: 'border-pink-300/20',
};

const TEXT_COLORS: Record<string, string> = {
    normal: "text-gray-300",
    fire: 'text-red-400',
    water: 'text-blue-400',
    grass: 'text-green-400',
    electric: 'text-yellow-300',
    ice: 'text-cyan-200',
    fighting: 'text-orange-500',
    poison: 'text-purple-400',
    ground: 'text-yellow-600',
    flying: 'text-indigo-300',
    psychic: 'text-pink-400',
    bug: 'text-lime-400',
    rock: 'text-stone-400',
    ghost: 'text-violet-600',
    dragon: 'text-indigo-600',
    dark: 'text-gray-700',
    steel: 'text-slate-300',
    fairy: 'text-pink-200',
};

export const DataCard = ({ pokemon }: Props) => {
    return (
        <li
            key={pokemon.name}
            className="group flex flex-col bg-[#1e293b] gap-3 border border-white/5 rounded-2xl p-5 shadow-xl transition duration-500 ease-in-out sm:min-w-87.5 sm:max-w-95 sm:flex-1
                     hover:shadow-2xl hover:border-white/20"
        >

            <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold text-slate-400 bg-white/5 px-2 py-1 rounded ">
                    #{String(pokemon.id).padStart(3, "0")}
                </p>

                <ul className="flex gap-1 uppercase">
                    {pokemon.types.map((type) => (
                        <span
                            key={type}
                            className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border 
                                ${TYPE_COLORS[type]}
                                ${BORDER_COLORS[type]}
                                ${TEXT_COLORS[type]}
                                `}
                        >
                            {type}
                        </span>
                    ))}
                </ul>
            </div>

            {/* Image */}
            <div className="w-full aspect-square bg-slate-900/40 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden border border-white/5">
                <img
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    className="w-4/5 h-4/5 transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            {/* Name */}
            <h3 className="text-xl font-bold text-white capitalize">
                {pokemon.name}
            </h3>

            {/* Height and weight */}
            <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1 text-slate-400">
                    <span className="material-symbols-outlined text-sm">height</span>
                    {pokemon.height / 10} m
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                    <span className="material-symbols-outlined text-sm">weight</span>
                    {pokemon.weight / 10} kg
                </div>
            </div>

            {/* Stats */}
            <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold w-12 text-slate-500 uppercase">HP</span>
                    <div className="stat-bar-bg">
                        <div className="stat-bar-fill bg-[#4ade80]" style={{ width: `${pokemon.stats.hp}%` }}></div>
                    </div>
                    <span className="text-[10px] font-bold w-6 text-right text-slate-300">{pokemon.stats.hp}</span>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold w-12 text-slate-500 uppercase">ATK</span>
                    <div className="stat-bar-bg">
                        <div className="stat-bar-fill bg-[#fb7185]" style={{ width: `${pokemon.stats.attack}%` }}></div>
                    </div>
                    <span className="text-[10px] font-bold w-6 text-right text-slate-300">{pokemon.stats.attack}</span>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold w-12 text-slate-500 uppercase">HP</span>
                    <div className="stat-bar-bg">
                        <div className="stat-bar-fill bg-[#38bdf8]" style={{ width: `${pokemon.stats.defense}%` }}></div>
                    </div>
                    <span className="text-[10px] font-bold w-6 text-right text-slate-300">{pokemon.stats.defense}</span>
                </div>
            </div>
        </li >
    )
}
