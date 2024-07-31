export class PokemonSDK{
    // pokemonName: string;
    // baseUrl: string;

    constructor() {
        // this.pokemonName = pokemonName;

    }

    public async fetchPokemon(pokemonName: string, callback: (data: any) => void){
        const baseUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        await fetch(baseUrl)//todo: make an sdk for this stuff :]
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then(callback).catch((e) => {
            console.log("terrible", Object.keys(e));
        });
    }
}

// fetch(baseUrl)//todo: make an sdk for this stuff :]
//     .then((res) => {
//         console.log(res);
//         return res.json();
//     })
//     .then((data) => {
//         console.log("data", JSON.stringify(data));
//         setPokemon(data);
//         // getAllValidSprites(data);
//         getAllGifSprites(data);
//         lookForFrontSprite(data);
//         console.log(sprites);
//         // console.log("data:", JSON.stringify(data));
//         // rotateSprite();
//         setPokemonSprite(data.sprites.other["official-artwork"].front_default);
//         // setPokemonColor(getPokemonTypeName(data as PokemonT));
//         setLoading(false);//todo this probably needs to be somewhere else!
//
//     }).catch((e) => {
//     console.log("terrible", Object.keys(e));
// });
