"use client";
import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import Image from "next/image";
import {PokemonSDK} from "@/app/pokemon/PokemonSDK";
import PokemonSearchForm from "@/app/pokemon/PokemonSearchForm";
import {PokemonStateContext} from "@/contexts/PokemonContext";
import {
    addPokemonToUserHistoryIfNotExists, doesUserHavePokemon, getUsername,
    getUserPokemonHistory,
} from "@/app/pokemon/[pokemon]/serverActions";
import {getDidYouMeanString} from "@/utils/StringUtils";
import {getContrastYIQ} from "@/utils/ColourUtils";
import {useRouter, useSearchParams} from "next/navigation";


export default function Pokemon({params}: { params: { pokemon: string } }) {
    const router = useRouter();
    const searchParams = useSearchParams().get("userId");
    const USER_ID = Number(searchParams || 1);
    const [isLoading, setLoading] = useState(true);
    const pokeSdk = useMemo(() => new PokemonSDK(), []);
    const [isError, setIsError] = useState(false);
    const [didYouMeanStr, setDidYouMeanStr] = useState("");
    const [username, setUsername] = useState("");
    const {pokemonHistory, setPokemonHistory} = useContext(PokemonStateContext);
    const displaySprite = useRef<string>("");

    const setUsernameFromDB = async () => {
        const usernameFromDB = await getUsername(USER_ID);
        setUsername(usernameFromDB);
    };

    const checkIfUserHasCurrentPokemon = async () => {
        const pokemonFound = await doesUserHavePokemon(params.pokemon, USER_ID);
        if (pokemonFound === null) {
            const userHistory = await getUserPokemonHistory(USER_ID);
            router.push(userHistory[0].name);
        }
    };

    useEffect(() => {
        setUsernameFromDB().then().catch(console.error);
        console.log("search params:", searchParams);
        if (pokeSdk !== null) {
            setLoading(true);
            setIsError(false);
            pokeSdk.fetchPokemon(params.pokemon.toLowerCase()).then(async (data) => {
                displaySprite.current = pokeSdk.getDisplaySprite();
                addPokemonToUserHistoryIfNotExists(USER_ID, {
                    name: pokeSdk.getPokemonName() || "",
                    type: pokeSdk.getPokemonTypeName(),
                    number: pokeSdk.getPokemonNumber()
                }).then((res) => {
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
                    <div
                        className="absolute top-2 left-2 flex flex-col gap-1 justify-start items-start"
                    >
                        <span>Showing Pokemon for {username}</span>
                        <span>{username} has caught {pokemonHistory.length} Pokemon</span>
                        <button
                            className="border-green-400 border 4 p-2 rounded-[4px] hover:bg-green-800 hover:border-green-800"
                            onClick={() => {
                            const attachParams = `?userId=${USER_ID}`;
                            router.push("/pokemon" + attachParams);
                        }}>Return home!
                        </button>
                    </div>
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
                            <div className="topInfo absolute top-2 flex justify-around w-full">
                                <span
                                    className="text-black font-bold z-20 bg-white p-1 pl-3 pr-3 rounded-3xl">
                                #{pokeSdk.getPokemonNumber()}
                            </span>
                                <span
                                    className="text-black font-bold z-20 bg-white p-1 pl-3 pr-3 rounded-3xl">
                                gen{pokeSdk.getPokemonGeneration()}
                            </span>
                                <div
                                    className="stat flex z-20 items-center justify-center bg-white p-1 pl-3 pr-3 rounded-3xl right-2">
                                <span className="text-black font-bold text-sm">
                                    {pokeSdk.getPokemonHpStatName()}
                                </span>
                                    <span className="text-black font-bold">
                                     {pokeSdk.getPokemonHpStat()}
                                 </span>
                                </div>
                            </div>

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
                        <PokemonSearchForm pokemonHistory={pokemonHistory} didYouMeanStr={didYouMeanStr}
                                           currentPokemonParam={params.pokemon}/>
                    </div>
                </>
            }
        </main>
    );
}
