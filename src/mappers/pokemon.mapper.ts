import type { PokemonApi, PokemonApiStat } from "../types/api/pokemon.types.api";
import type { Pokemon, PokemonStats } from "../types/domain/pokemon.types.domain";


const getStateValue = (stats: PokemonApiStat[], statName: PokemonApiStat['stat']['name']): number => {
    return stats.find(stat => stat.stat.name === statName)?.base_stat ?? 0;
};

const mapPokemonStats = (stats: PokemonApiStat[]): PokemonStats => {
    return {
        hp: getStateValue(stats, 'hp'),
        attack: getStateValue(stats, 'attack'),
        defense: getStateValue(stats, 'defense'),
        specialAttack: getStateValue(stats, 'special-attack'),
        specialDefense: getStateValue(stats, 'special-defense'),
        speed: getStateValue(stats, 'speed'),
    };
};

export const mapPokemonFromApi = (apiPokemon: PokemonApi): Pokemon => {
    return {
        id: apiPokemon.id,
        name: apiPokemon.name,
        image: apiPokemon.sprites.other['official-artwork'].front_default || apiPokemon.sprites.front_default,
        types: apiPokemon.types.map(type => type.type.name),
        stats: mapPokemonStats(apiPokemon.stats),
    };
};