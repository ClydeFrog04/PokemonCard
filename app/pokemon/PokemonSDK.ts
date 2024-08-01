import {PokemonT, TypeColors} from "@/app/yay/PokemonAPITypes";

export class PokemonSDK {
    // pokemonName: string;
    // baseUrl: string;
    private sprites: string[] = [];
    private pokemon: PokemonT | null = null;

    constructor() {
        // this.pokemonName = pokemonName;

    }

    /*
    const lookForFrontSprite = (data: PokemonT | null) => {
        const defaultLogo = "https://press.pokemon.com/en/products/Pokemon-Logo-55300";
        if (data === null) return defaultLogo;
        //sprites array is filled in the recurseSpritesFunction, called in getAllOfficialSprites
        // then we just get the first sprite in the array to get the front sprite, or default to poke logo if none found!
        const sprite = sprites.current[0];
        setPokemonSprite(sprite || defaultLogo);//default pokemon logo for backup :]
    };
     */
    public getDisplaySprite() {
        return this.sprites[0]
    }

    public async fetchPokemon(pokemonName: string, callback: (data: any) => void) {
        const baseUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        // await fetch(baseUrl)
        //     .then((res) => {
        //         console.log(res);
        //         return res.json();
        //     })
        //     .then(callback).catch((e) => {
        //         console.log("terrible", Object.keys(e));
        //     });
        await fetch(baseUrl)
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((data) => {
                this.pokemon = data;
                this.getAndSetAllOfficialSprites(data);
            }).catch((e) => {
                console.log("terrible", Object.keys(e));//todo: we need to do something when there is a failure to get the pokemon
            });
    }

    /**
     * gets all sprites with "official" in the name and pushes them to the sprites array
     * @param data
     */
    private getAndSetAllOfficialSprites = (data: PokemonT) => {
        if(data === null){
            //if we have no pokemon data, set a default sprite and return
            this.sprites.push("https://press.pokemon.com/en/products/Pokemon-Logo-55300");
            return;
        }
        this.sprites = [];
        if (data.sprites) {
            this.recurseSprites(data.sprites, "official");
        }
    };

    private recurseSprites(data: any, pattern?: string) {
        Object.keys(data).some((k) => {
            if (data[k] == null) {
                return;
            }
            if (typeof data[k] === "object") {
                this.recurseSprites(data[k], pattern);
            } else if (pattern === undefined || data[k].includes(pattern)){
                this.sprites.push(data[k]);
            }
        });
    };
    public getPokemonTypeColour = () => {
        const colour = (this.pokemon && TypeColors[this.getPokemonTypeName()]) as string;
        console.log("colour", colour);
        return colour;
    };
    public getPokemonTypeName = () => {
        if (this.pokemon) {
            console.log("type name", this.pokemon.types[0].type.name);
            //before:bg-[${pokemonColor}]
            console.log(`before:bg-${this.pokemon.types[0].type.name}`);
            return this.pokemon.types[0].type.name;
        } else {
            //default to normal
            return "normal";
        }
    };
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
