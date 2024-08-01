"use client";
import React, {useEffect, useRef, useState} from "react";
import {PokemonT, TypeColors} from "@/app/yay/PokemonAPITypes";
import Image from "next/image";
import {PokemonSDK} from "@/app/pokemon/PokemonSDK";
import {useRouter} from "next/navigation";


export default function Pokemon({params}: { params: { pokemon: string } }) {
    const [pokemon, setPokemon] = useState<PokemonT | null>(null);
    // const [sprites, setSprites] = useState<string[]>([]);
    // const sprites = useRef<string[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [pokemonSprite, setPokemonSprite] = useState("");
    const pokeSdk = useRef<PokemonSDK>(new PokemonSDK());
    const [pokemonInputValue, setPokemonInputValue] = useState("");
    const router = useRouter();


    useEffect(() => {
        // pokeSdk.current = ;
        if(pokeSdk.current !== null){
            setLoading(true);
            pokeSdk.current.fetchPokemon(params.pokemon.toLowerCase(), handleFetchResult);
        }
    }, []);

    // const getAllOfficialSprites = (data: PokemonT) => {
    //     if (data.sprites) {
    //         recurseSprites(data.sprites, "official");
    //     }
    // };
    const handleFetchResult = (data: any) => {
        console.log("data", JSON.stringify(data));
        setPokemon(data);
        // getAllValidSprites(data);
        getAllOfficialSprites(data);
        lookForFrontSprite(data);
        console.log("sprites:", sprites);
        // console.log("data:", JSON.stringify(data));
        // rotateSprite();
        setPokemonSprite(data.sprites.other["official-artwork"].front_default);
        // setPokemonColor(getPokemonTypeName(data as PokemonT));
        setLoading(false);
    }

    // const lookForFrontSprite = (data: PokemonT | null) => {
    //     const defaultLogo = "https://press.pokemon.com/en/products/Pokemon-Logo-55300";
    //     if (data === null) return defaultLogo;
    //     //sprites array is filled in the recurseSpritesFunction, called in getAllOfficialSprites
    //     // then we just get the first sprite in the array to get the front sprite, or default to poke logo if none found!
    //     const sprite = sprites.current[0];
    //     setPokemonSprite(sprite || defaultLogo);//default pokemon logo for backup :]
    // };


    // const recurseSprites = (data: any, pattern?: string) => {
    //     Object.keys(data).some((k) => {
    //         // console.log(k);
    //         if (data[k] !== null) {
    //             if (typeof data[k] === "object") {
    //                 recurseSprites(data[k], pattern);
    //             } else {
    //                 if (pattern === undefined || data[k].includes(pattern)) {
    //                     sprites.current.push(data[k]);
    //                 }
    //             }
    //         }
    //     });
    // };

    /**
     *
     * @param colour a string in the format rgb(r, g, b);
     *               this colour comes from the PokemonAPITypes using the Pokemon element type to pick the appropriate colour
     */
    const getContrastYIQ = (colour: string): string => {
        const split = colour.match(/rgb\(|\d+|\)/g)?.filter((value) => {
            //var result = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
            const num = parseInt(value);
            return !isNaN(num);
        });
        // const split = colour.match(/^rgb?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        console.log("split", split);
        if (split !== undefined) {
            const r = parseInt(split[0]);
            const g = parseInt(split[1]);
            const b = parseInt(split[2]);

            const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
            return (yiq >= 128) ? "black" : "white";
        } else {
            //default to blakc i guess
            return "black";
        }
    };


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {!isLoading &&
                <>
                    <div className={"pokemonCard relative"}>
                        <div id={pokemon?.name + "Card"}
                             className={`flex justify-items-center justify-center flex-col
                         content-center items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-gray-300 shadow-2xl
                         before:content-['']
                         before:bg-${getPokemonTypeName()}
                         before:absolute
                         before:top-0
                         before:h-1/2
                         before:w-full
                         before:rounded-t-lg
                         before:rounded-b-[51%]
                         `}>
                            {/* hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700*/}
                            <Image
                                className="z-10"
                                // loader={() => pokemonSprite}
                                src={pokemonSprite}
                                alt="pokemon Logo"
                                width={200}
                                height={200}
                                // className="w-full h-auto"
                                priority
                                // unoptimized={true}
                            />
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-black text-center capitalize bg">
                                {/*{pokemon?.name} {pokemon && TypeColors[pokemon.types[0].type.name]}*/}
                                {pokemon?.name}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400 text-center px-4 py-1 rounded-2xl"
                               style={{
                                   color: (getContrastYIQ(pokeSdk.current!.getPokemonTypeColour())),
                                   backgroundColor: pokeSdk.current!.getPokemonTypeColour()// pokemon.types[0].type.name
                               }}
                            >
                                {pokemon?.types[0].type.name}
                            </p>
                            <section
                                className="font-normal text-gray-700 dark:text-gray-400 text-center flex flex-row space-x-8 mt-8">
                                <div className="stat flex flex-col">
                                <span className="text-black font-bold text-2xl">
                                     {pokemon?.stats[1].base_stat}
                                 </span>
                                    <span>
                                    {pokemon?.stats[1].stat.name}
                                </span>
                                </div>
                                <div className="stat flex flex-col">
                                <span className="text-black font-bold text-2xl">
                                     {pokemon?.stats[2].base_stat}
                                 </span>
                                    <span>
                                    {pokemon?.stats[2].stat.name}
                                </span>
                                </div>
                                <div className="stat flex flex-col">
                                <span className="text-black font-bold text-2xl">
                                     {pokemon?.stats[5].base_stat}
                                 </span>
                                    <span>
                                    {pokemon?.stats[5].stat.name}
                                </span>
                                </div>
                            </section>
                        </div>
                    </div>
                    <form action="" onSubmit={ (e: React.FormEvent) => {
                        e.preventDefault();
                        // pokeSdk.current?.fetchPokemon(pokemonInputValue, handleFetchResult);
                        router.push(pokemonInputValue);
                    }}>
                        <input className="text-black" onChange={ (e) => {
                            setPokemonInputValue(e.target.value);
                        }}/>
                    </form>
                </>
            }
        </main>
    );
}
