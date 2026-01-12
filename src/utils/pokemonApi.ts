import type { Pokemon, PokemonWithDetails } from "../types/pokemon.types";

export const fetchPokemonDetails = async (url: string): Promise<PokemonWithDetails> => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch pokemon details: ${response.status}`);
    }

    const data: Pokemon = await response.json();

    const hpStat = data.stats.find(s => s.stat.name === 'hp');
    const attackStat = data.stats.find(s => s.stat.name === 'attack');
    const defenseStat = data.stats.find(s => s.stat.name === 'defense');

    return {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        sprite: data.sprites.other['official-artwork'].front_default,
        types: data.types.map(t => t.type.name),
        stats: {
            hp: hpStat?.base_stat ?? 0,
            attack: attackStat?.base_stat ?? 0,
            defense: defenseStat?.base_stat ?? 0,
        }
    };
};