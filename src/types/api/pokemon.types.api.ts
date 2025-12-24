// Pokemon list
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

// Details of an individual Pokémon
export interface PokemonApi {
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
    types: PokemonApiType[];
    stats: PokemonApiStat[];
}

export interface PokemonApiType {
    slot: number;
    type: {
        name: string;
    };
}

export interface PokemonApiStat {
    base_stat: number;
    stat: {
        name:
        | 'hp'
        | 'attack'
        | 'defense'
        | 'special-attack'
        | 'special-defense'
        | 'speed'
    };
}
