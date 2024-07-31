class PokemonSDK{
    pokemonName: string;
    baseUrl: string;

    constructor(pokemonName: string) {
        this.pokemonName = pokemonName;
        this.baseUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    }

}
