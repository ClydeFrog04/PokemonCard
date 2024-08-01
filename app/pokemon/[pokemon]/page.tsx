"use client";
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {PokemonSDK} from "@/app/pokemon/PokemonSDK";
import {useRouter} from "next/navigation";
import didYouMean from "didyoumean";
import names from "@/app/pokemon/names.json";
import Link from "next/link";


export default function Pokemon({params}: { params: { pokemon: string } }) {
    const [isLoading, setLoading] = useState(true);
    const pokeSdk = useRef<PokemonSDK>(new PokemonSDK());
    const [pokemonInputValue, setPokemonInputValue] = useState("");
    const router = useRouter();
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        if (pokeSdk.current !== null) {
            setLoading(true);
            setIsError(false);
            pokeSdk.current.fetchPokemon(params.pokemon.toLowerCase()).then((data) => {
                console.log("Fetch done!", data);
                setLoading(false);
            }).catch((err) => {
                console.log("Oh no a bad happened");
                setTimeout(() => {
                    setLoading(false);
                    setIsError(true);
                }, 1000);
            });
        }
    }, []);

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
        console.log("split", split);
        if (split === undefined) {
            //default to black- maybe not the best!
            return "black";
        }
        const r = parseInt(split[0]);
        const g = parseInt(split[1]);
        const b = parseInt(split[2]);

        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? "black" : "white";
    };

    /**
     * returns a Capitalized version of the given string
     * @param str
     */
    const toCapitalize =  (str: string) => {
        const split = str.split(" ");
        const caps = split.map( (word) => {
            const firstLetter = word.charAt(0).toUpperCase();
            const rest = word.substring(1);
            return firstLetter + rest;
        });
        return caps.join("");

    }


    if (isLoading) {
        return (
            <main className="flex min-h-screen flex-col items-center p-24 justify-around">
                We are working on that!
            </main>
        );
    } else if (isError) {
        return (
            <main className="flex min-h-screen flex-col items-center p-24 justify-center gap-4">
                <p>
                    We couldn&apos;t find a pokemon with the name &quot;{decodeURI(params.pokemon)}&quot; :[
                    Please try a different pokemon!
                </p>
                <Link className="bg-blue-500 p-2 rounded-[4px] hover:bg-blue-800" href={`/pokemon/${didYouMean(decodeURI(params.pokemon), names)}`}>Did you mean &quot;{toCapitalize(didYouMean(decodeURI(params.pokemon), names).toString())}&quot;?</Link>
                <form action="" onSubmit={(e: React.FormEvent) => {//todo: create a component for this form!
                    e.preventDefault();
                    router.push(pokemonInputValue);
                }}>
                    <input autoFocus={true} className="text-black rounded-[4px] p-[4px]"
                           placeholder={"enter a pokemon to find!"} onChange={(e) => {
                        setPokemonInputValue(e.target.value);
                    }}/>
                </form>

            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24 justify-around">
            {!isLoading &&
                <>
                    <div className="cardContainer flex flex-col items-center gap-4">
                        <article id={pokeSdk.current.getPokemonName() + "Card"} className={`relative flex justify-items-center justify-center flex-col
                         content-center items-center max-w-sm p-6 bg-white rounded-lg shadow-gray-300 shadow-2xl
                         before:content-['']
                         before:bg-${pokeSdk.current.getPokemonTypeName()}
                         before:absolute
                         before:top-0
                         before:h-1/2
                         before:w-full
                         before:rounded-t-lg
                         before:rounded-b-[51%]
                         before:
                         `}>
                            <Image
                                className="z-10"
                                src={pokeSdk.current.getDisplaySprite()}
                                alt="pokemon Logo"
                                width={200}
                                height={200}
                                priority
                            />
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-black text-center capitalize bg">
                                {pokeSdk.current.getPokemonName()}
                            </h5>
                            <p className={`font-normal text-gray-700 dark:text-gray-400 text-center px-4 py-1 rounded-2xl bg-${pokeSdk.current.getPokemonTypeName()}`}
                               style={{
                                   color: (getContrastYIQ(pokeSdk.current.getPokemonTypeColour())),
                                   // backgroundColor: pokeSdk.current!.getPokemonTypeColour()
                               }}
                            >
                                {pokeSdk.current.getPokemonTypeName()}
                            </p>
                            <section
                                className="font-normal text-gray-700 dark:text-gray-400 text-center flex flex-row space-x-8 mt-8">
                                <div className="stat flex flex-col">
                                <span className="text-black font-bold text-2xl">
                                     {pokeSdk.current.getPokemonAttackStat()}
                                 </span>
                                    <span>
                                    {pokeSdk.current.getPokemonAttackStatName()}
                                </span>
                                </div>
                                <div className="stat flex flex-col">
                                <span className="text-black font-bold text-2xl">
                                     {pokeSdk.current.getPokemonDefenseStat()}
                                 </span>
                                    <span>
                                    {pokeSdk.current.getPokemonDefenseStatName()}
                                </span>
                                </div>
                                <div className="stat flex flex-col">
                                <span className="text-black font-bold text-2xl">
                                     {pokeSdk.current.getPokemonSpeed()}
                                 </span>
                                    <span>
                                    {pokeSdk.current.getPokemonSpeedName()}
                                </span>
                                </div>
                            </section>
                        </article>
                        <form action="" onSubmit={(e: React.FormEvent) => {
                            e.preventDefault();
                            router.push(pokemonInputValue);
                        }}>
                            <input autoFocus={true} className="text-black rounded-[4px] p-[4px]"
                                   placeholder={"enter a pokemon to find!"} onChange={(e) => {
                                setPokemonInputValue(e.target.value);
                            }}/>
                        </form>
                    </div>
                </>
            }
        </main>
    );
}
