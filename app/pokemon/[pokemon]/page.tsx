"use client";
import {useEffect, useRef, useState} from "react";
import {PokemonT, TypeColors} from "@/app/yay/PokemonAPITypes";
import Image from "next/image";
import {Property} from "csstype";
import {type} from "os";

export default function Pokemon({params}: { params: { pokemon: string } }) {
    const [pokemon, setPokemon] = useState<PokemonT | null>(null);
    const [pokemonColor, setPokemonColor] = useState("");

    const [sprites, setSprites] = useState<string[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [pokemonSprite, setPokemonSprite] = useState("");
    const [pokemonTypeName, setPokemonTypeName] = useState("water");

    // const [spriteIndex, setSpriteIndex] = useState(0);
    const spriteIndex = useRef(0);

    const spriteRotateInterval = useRef<NodeJS.Timeout>();

    const baseUrl = `https://pokeapi.co/api/v2/pokemon/${params.pokemon.toLowerCase()}`;

    useEffect(() => {
        console.log("yeet");
        let intervalId: NodeJS.Timeout;
        fetch(baseUrl)//todo: make an sdk for this stuff :]
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((data) => {
                console.log("data", JSON.stringify(data));
                setPokemon(data);
                // getAllValidSprites(data);
                getAllGifSprites(data);
                lookForFrontSprite(data);
                console.log(sprites);
                // console.log("data:", JSON.stringify(data));
                // rotateSprite();
                setPokemonSprite(data.sprites.other["official-artwork"].front_default);
                // setPokemonColor(getPokemonTypeName(data as PokemonT));
                setLoading(false);//todo this probably needs to be somewhere else!

            }).catch((e) => {
            console.log("terrible", Object.keys(e));
        });
        return () => {
            console.log("unmounting:", intervalId, spriteRotateInterval.current);
            clearInterval(spriteRotateInterval.current as NodeJS.Timeout);
            clearInterval(intervalId);
        };
    }, []);

    // useEffect(() => {
    //     const ind = sprites.length;
    //     const sprite = sprites[spriteIndex.current];
    //     console.log("curr change");
    //     if (sprites.length !== 0) {
    //         setPokemonSprite(sprite);
    //     }
    // }, [spriteIndex.current, sprites.length]);

    const lookForFrontSprite = (data: PokemonT | null) => {
        const defaultLogo = "https://press.pokemon.com/en/products/Pokemon-Logo-55300";
        if (data === null) return defaultLogo;
        const sprite = sprites[spriteIndex.current];//data.sprites.front_default;
        setPokemonSprite(sprite || defaultLogo);//default pokemon logo for backup :]
    };

    const getAllValidSprites = (data: PokemonT) => {
        // console.log("data", data);
        // for(let img in data?.sprites){
        //     const url = data?.sprites[img];
        //     if(url !== null && img !== "other" && img !== "versions"){
        //         console.log("img", img, url);
        //     }
        // }
        if (data.sprites) {
            recurseSprites(data.sprites);
            // console.log(sprites);
        }
    };

    const getAllGifSprites = (data: PokemonT) => {
        if (data.sprites) {
            recurseSprites(data.sprites, "official");
        }
    };

    const recurseSprites = (data: any, pattern?: string) => {
        Object.keys(data).some((k) => {
            // console.log(k);
            if (data[k] !== null) {
                if (typeof data[k] === "object") {
                    recurseSprites(data[k], pattern);
                } else {
                    if (pattern === undefined || data[k].includes(pattern)) {
                        sprites.push(data[k]);
                    }
                }
            }
        });
    };

    const rotateSprite = () => {
        if (spriteRotateInterval.current === undefined) {
            spriteRotateInterval.current = setInterval(() => {
                console.log("interval called");
                // setSpriteIndex((prevState) => {
                //     const newIndex = prevState + 1;
                //
                //     return newIndex;
                // });
                const newIndex = spriteIndex.current + 1;
                spriteIndex.current = newIndex;
                console.log("changing sprite to:", newIndex);
                const sprite = sprites[spriteIndex.current % sprites.length];
                console.log("curr change", sprite);
                setPokemonSprite(sprite);
            }, 1000);
            console.log("interval created", spriteRotateInterval.current);
        }
    };

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
    const getPokemonTypeColour = () => {
        const colour = (pokemon && TypeColors[getPokemonTypeName()]) as string;
        console.log("colour", colour);
        return colour;
    };
    const getPokemonTypeName = () => {
        if (pokemon) {
            console.log("type name", pokemon.types[0].type.name);
            //before:bg-[${pokemonColor}]
            console.log(`before:bg-${pokemon.types[0].type.name}`);
            return pokemon.types[0].type.name;
        } else {
            //default to normal
            return "normal";
        }
    };

    // const getPokemonColourRGB = () => {
        const colors = {
            normal: "rgb(84, 84, 54)",
            fire: "rgb(172, 79, 12)",
            water: "rgb(14, 50, 137)",
            electric: "rgb(130, 105, 4)",
            grass: "rgb(95, 144, 45)",
            ice: "rgb(37, 99, 99)",
            fighting: "rgb(154, 38, 32)",
            poison: "rgb(128, 51, 128)",
            ground: "rgb(100, 79, 20)",
            flying: "rgb(39, 15, 112)",
            psychic: "rgb(149, 6, 49)",
            bug: "rgb(134, 147, 26)",
            rock: "rgb(147, 128, 45)",
            ghost: "rgb(90, 70, 122)",
            dragon: "rgb(53, 6, 169)",
            dark: "rgb(90, 70, 58)",
            steel: "rgb(49, 49, 73)",
            fairy: "rgb(86, 18, 25)",
        };
    // };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {!isLoading &&
                <div className={"pokemonCard relative"}>
                    {/*<div className="name">*/}
                    {/*    {params.pokemon}*/}
                    {/*</div>*/}
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
                               color: (getContrastYIQ(getPokemonTypeColour())),
                               backgroundColor: getPokemonTypeColour()// pokemon.types[0].type.name
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
            }
        </main>
    );
}
