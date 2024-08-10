import {PokemonT, TypeColors} from "@/app/pokemon/PokemonAPITypes";

// import {writeFile} from "fs";

export class PokemonSDK {
    // pokemonName: string;
    // baseUrl: string;
    private sprites: string[] = [];
    private pokemon: PokemonT | null = null;
    private readonly isShiny: boolean;

    constructor() {
        // this.pokemonName = pokemonName;
        const num = Math.floor(Math.random() * 4096);
        console.log("getdisplaysprite called", num);
        this.isShiny = num === 1;
    }

    public getIsShiny() {
        return this.isShiny;
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
        return this.sprites[this.isShiny ? 1 : 0];
    }

    public getBackDisplaySprite() {
        return this.sprites[1];
    }

    public getPokemonName() {
        // console.log("get name called:", this.pokemon?.name);
        return this.pokemon?.name;
    }

    public async fetchPokemon(pokemonName: string) {
        const baseUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        return await fetch(baseUrl)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.pokemon = data;
                this.getAndSetAllOfficialSprites(data);
            });
    }

    /**
     * gets all sprites with "official" in the name and pushes them to the sprites array
     * @param data
     */
    private getAndSetAllOfficialSprites = (data: PokemonT) => {
        if (data === null) {
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
            } else if (pattern === undefined || data[k].includes(pattern)) {
                this.sprites.push(data[k]);
            }
        });
    };

    public getPokemonTypeColour = () => {
        const colour = (this.pokemon && TypeColors[this.getPokemonTypeName()]) as string;
        return colour;
    };
    public getPokemonTypeName = () => {
        if (!this.pokemon) return "normal";

        return this.pokemon.types[0].type.name;
    };

    public getPokemonAttackStat() {
        if (!this.pokemon) return 0;
        return this.pokemon.stats[1].base_stat;
    }

    public getPokemonAttackStatName() {
        if (!this.pokemon) return 0;
        return this.pokemon.stats[1].stat.name;
    }

    public getPokemonDefenseStat() {
        if (!this.pokemon) return 0;
        return this.pokemon.stats[2].base_stat;
    }

    public getPokemonDefenseStatName() {
        if (!this.pokemon) return 0;
        return this.pokemon.stats[2].stat.name;
    }

    public getPokemonSpeed() {
        if (!this.pokemon) return 0;
        return this.pokemon.stats[5].base_stat;
    }

    public getPokemonSpeedName() {
        if (!this.pokemon) return 0;
        return this.pokemon.stats[5].stat.name;
    }
}
