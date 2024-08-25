"use client";
import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import Image from "next/image";
import {PokemonSDK} from "@/app/pokemon/PokemonSDK";
import PokemonSearchForm from "@/app/pokemon/PokemonSearchForm";
import {PokemonStateContext} from "@/contexts/PokemonContext";
import {
    addPokemonToUserHistoryIfNotExists,
    getUserPokemonHistory,
} from "@/app/pokemon/[pokemon]/serverActions";
import {getDidYouMeanString} from "@/utils/StringUtils";
import {getContrastYIQ} from "@/utils/ColourUtils";


export default function Pokemon({params}: { params: { pokemon: string } }) {
    const [isLoading, setLoading] = useState(true);
    const pokeSdk = useMemo(() => new PokemonSDK(), []);
    const [isError, setIsError] = useState(false);
    const [didYouMeanStr, setDidYouMeanStr] = useState("");
    const {pokemonHistory, setPokemonHistory} = useContext(PokemonStateContext);
    const displaySprite = useRef<string>("");
    const USER_ID = 1;

    useEffect(() => {
        if (pokeSdk !== null) {
            setLoading(true);
            setIsError(false);
            pokeSdk.fetchPokemon(params.pokemon.toLowerCase()).then(async (data) => {
                displaySprite.current = pokeSdk.getDisplaySprite();
                addPokemonToUserHistoryIfNotExists(USER_ID, {name: pokeSdk.getPokemonName() || "", type: pokeSdk.getPokemonTypeName(), number: pokeSdk.getPokemonNumber()}).then((res) => {
                });
                const newHistory = await getUserPokemonHistory(USER_ID);
                setPokemonHistory(newHistory);
                setLoading(false);
            }).catch((err) => {
                setDidYouMeanStr(getDidYouMeanString(params.pokemon));
                setLoading(false);
                setIsError(true);
            });
        }
    }, []);

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
                         content-center items-center max-w-sm p-6 bg-white rounded-lg shadow-gray-300 shadow-2xl
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
                        <PokemonSearchForm pokemonHistory={pokemonHistory} didYouMeanStr={didYouMeanStr} currentPokemonParam={params.pokemon}/>
                    </div>
                </>
            }
        </main>
    );
}
