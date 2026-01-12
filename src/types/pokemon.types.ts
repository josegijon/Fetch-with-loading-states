// List response
export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonBasic[];
}

export interface PokemonBasic {
    name: string;
    url: string;
}

// Details pokemon
export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            }
        }
    };
    types: PokemonType[];
    stats: PokemonStat[];
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
    };
}

export interface PokemonStat {
    base_stat: number;
    stat: {
        name: string;
    };
}

export interface PokemonWithDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprite: string;
    types: string[];
    stats: {
        hp: number;
        attack: number;
        defense: number;
    };
}