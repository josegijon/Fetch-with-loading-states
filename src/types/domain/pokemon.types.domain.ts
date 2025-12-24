export interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
    stats: PokemonStats;
}

export interface PokemonStats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}