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
        this.isShiny = num === 1;
    }

    public getIsShiny() {
        return this.isShiny;
    }

    public getPokemonGeneration(){
        const pokeNumber = this.getPokemonNumber();
        if(pokeNumber <= 151){
            return 1;
        } else if(pokeNumber <= 251){
            return 2;
        } else if(pokeNumber <= 386){
            return 3;
        } else if(pokeNumber <= 493){
            return 4;
        } else if(pokeNumber <= 649){
            return 5;
        } else if(pokeNumber <= 721){
            return 6;
        } else if(pokeNumber <= 809){
            return 7;
        } else if(pokeNumber <= 905){
            return 8;
        } else if(pokeNumber <= 1025){
            return 9;
        }
        return -1;
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
        return this.pokemon?.name;
    }

    public getPokemonNumber(){
        if(!this.pokemon){
            return -1;
        }
        return this.pokemon?.id;
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
                return data;
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

    public getPokemonHpStat() {
        if (!this.pokemon) return 0;
        return this.pokemon.stats[0].base_stat;
    }

    public getPokemonHpStatName() {
        if (!this.pokemon) return 0;
        return this.pokemon.stats[0].stat.name;
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
