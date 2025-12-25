import { DataList } from "./DataList"

export const PokemonApp = () => {
    return (
        <div className="bg-gradient flex-col gap-4">
            <div className="flex flex-col items-center gap-3">
                <h1 className="text-4xl font-bold">
                    Pokédex Explorer
                </h1>

                <p className="text-lg font-thin">
                    Explore and search through hundreds of Pokémon
                </p>
            </div>

            <DataList />
        </div>
    )
}
