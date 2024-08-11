"use client";
import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import Image from "next/image";
import {PokemonSDK} from "@/app/pokemon/PokemonSDK";
import didYouMean from "didyoumean";
import names from "@/app/pokemon/names.json";
import PokemonSearchForm from "@/app/pokemon/PokemonSearchForm";
import {PokemonStateContext} from "@/contexts/PokemonContext";


export default function Pokemon({params}: { params: { pokemon: string } }) {
    const [isLoading, setLoading] = useState(true);
    const pokeSdk = useMemo(() => new PokemonSDK(), []);
    const [isError, setIsError] = useState(false);
    const [didYouMeanStr, setDidYouMeanStr] = useState("");
    const {pokemonHistory, setPokemonHistory} = useContext(PokemonStateContext);
    const displaySprite = useRef<string>("");


    useEffect(() => {
        console.log("pokemon history:", pokemonHistory);
        if (pokeSdk !== null) {
            setLoading(true);
            setIsError(false);
            pokeSdk.fetchPokemon(params.pokemon.toLowerCase()).then((data) => {
                // console.log("Fetch done!", data);
                console.log("fetching?");
                displaySprite.current = pokeSdk.getDisplaySprite();
                // pokemonHistory.push(params.pokemon);
                if(!pokemonHistory.includes(params.pokemon)){
                    const newHistory = [...pokemonHistory, params.pokemon];
                    sessionStorage.setItem("pokemonHistory", JSON.stringify(newHistory));
                    localStorage.setItem("pokemonHistory", JSON.stringify(newHistory));
                    console.log("new history:", JSON.stringify(newHistory));
                    setPokemonHistory(newHistory);
                }
                // setTimeout( () => {
                setLoading(false);

                // },2000)
            }).catch((err) => {
                console.log("Oh no a bad happened");
                // setTimeout(() => {
                setDidYouMeanStr(getDidYouMeanString(params.pokemon));
                setLoading(false);
                setIsError(true);
                // }, 1000);
            });
        }
    }, []);

    useEffect(() => {
        // console.log(localStorage.getItem("pokemonHistory"));
        if(pokeSdk !== null){
            console.log("poketype name",pokeSdk.getPokemonTypeName());
            console.log("poke name",pokeSdk.getPokemonName());
            console.log(`shadow-${pokeSdk.getPokemonTypeName()}`);
        }
    }, [pokeSdk]);

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
        // console.log("split", split);
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

    const getDidYouMeanString = (attempt: string): string => {
        //todo: this returns null when there is no match, rather than the array or string it claims, need a better default system:[
        const didYouMeanStr = didYouMean(attempt, names);
        console.log(didYouMeanStr);
        if (Array.isArray(didYouMeanStr)) {
            console.log("we have an array:", JSON.stringify(didYouMeanStr));
            return didYouMeanStr[0];
        }
        if (didYouMeanStr === null) {
            return "none";
        }
        console.log("no array, but it failed:", didYouMeanStr);
        return didYouMeanStr;
    };


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
                {/*{didYouMeanStr !== "none" &&*/}
                {/*    <Link className="bg-blue-500 p-2 rounded-[4px] hover:bg-blue-800"*/}
                {/*          href={`/pokemon/${didYouMeanStr}`}>Did you*/}
                {/*        mean &quot;{toCapitalize(didYouMeanStr)}&quot;?</Link>*/}
                {/*}*/}

                <PokemonSearchForm pokemonHistory={pokemonHistory} showDidYouMean={didYouMeanStr !== "none"}
                                   didYouMeanStr={didYouMeanStr} currentPokemonParam={params.pokemon}/>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24 justify-around">
            {!isLoading &&
                <>
                    <div className="cardContainer flex flex-col items-center gap-4">
                        <article id={pokeSdk.getPokemonName() + "Card"} className={`relative flex justify-items-center justify-center flex-col
                         content-center items-center max-w-sm p-6 bg-white rounded-lg shadow-${pokeSdk.getPokemonTypeName()} shadow-2xl mb-10
                         before:content-['']
                         before:bg-${pokeSdk.getPokemonTypeName()}
                         before:absolute
                         before:top-0
                         before:h-1/2
                         before:w-full
                         before:rounded-t-lg
                         before:rounded-b-[51%]
                         `}>
                            <Image
                                className="z-10"
                                src={displaySprite.current}
                                alt="pokemon Logo"
                                width={200}
                                height={200}
                                priority
                            />
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-black text-center capitalize bg">
                                {pokeSdk.getIsShiny() ? "shiny" : null} {pokeSdk.getPokemonName()}
                            </h5>
                            <p className={`font-normal text-gray-700 dark:text-gray-400 text-center px-4 py-1 rounded-2xl bg-${pokeSdk.getPokemonTypeName()}`}
                               style={{
                                   color: (getContrastYIQ(pokeSdk.getPokemonTypeColour())),
                                   // backgroundColor: pokeSdk!.getPokemonTypeColour()
                               }}
                            >
                                {pokeSdk.getPokemonTypeName()}
                            </p>
                            <section
                                className="font-normal text-gray-700 dark:text-gray-400 text-center flex flex-row space-x-8 mt-8">
                                <div className="stat flex flex-col">
                                <span className="text-black font-bold text-2xl">
                                     {pokeSdk.getPokemonAttackStat()}
                                 </span>
                                    <span>
                                    {pokeSdk.getPokemonAttackStatName()}
                                </span>
                                </div>
                                <div className="stat flex flex-col">
                                <span className="text-black font-bold text-2xl">
                                     {pokeSdk.getPokemonDefenseStat()}
                                 </span>
                                    <span>
                                    {pokeSdk.getPokemonDefenseStatName()}
                                </span>
                                </div>
                                <div className="stat flex flex-col">
                                <span className="text-black font-bold text-2xl">
                                     {pokeSdk.getPokemonSpeed()}
                                 </span>
                                    <span>
                                    {pokeSdk.getPokemonSpeedName()}
                                </span>
                                </div>
                            </section>
                        </article>
                        {/*<form action="" onSubmit={handleFormSubmit}>*/}
                        {/*    <input autoFocus={true} className="text-black rounded-[4px] p-[4px]"*/}
                        {/*           placeholder={"enter a pokemon to find!"} onChange={(e) => {*/}
                        {/*        setPokemonInputValue(e.target.value);*/}
                        {/*    }}/>*/}
                        {/*</form>*/}
                        <PokemonSearchForm pokemonHistory={pokemonHistory} didYouMeanStr={didYouMeanStr} currentPokemonParam={params.pokemon}/>
                    </div>
                </>
            }
        </main>
    );
}
