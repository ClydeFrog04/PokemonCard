"use client";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {toCapitalize} from "@/utils/StringUtils";


type ParamsT = {
    pokemonHistory: string[];
    // handleFormSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
    // currentSelectValue: string;
    showDidYouMean?: boolean;
    didYouMeanStr: string;
    currentPokemonParam: string;
}

export default function PokemonSearchForm({pokemonHistory, didYouMeanStr, currentPokemonParam}: ParamsT) {
    const [pokemonInputValue, setPokemonInputValue] = useState("");
    const [currentSelectValue, setCurrentSelectValue] = useState(pokemonHistory[0]);
    const router = useRouter();


    useEffect(() => {
        console.log("pokemon given was:", currentPokemonParam);
        setCurrentSelectValue(currentPokemonParam);
    }, []);


    function handlePokemonChange(e: React.ChangeEvent<HTMLSelectElement>) {
        // router.push(e.target.value);
        setCurrentSelectValue(e.target.value);
        router.push(e.target.value);
        console.log("e");
    }

    const handleFormSubmit = (e: React.FormEvent) => {//todo: create a component for this form!
        e.preventDefault();
        router.push(pokemonInputValue);
    };

    return (
        <form className={"grid gap-4"} action="" onSubmit={handleFormSubmit}>
            {(didYouMeanStr !== "none" && didYouMeanStr !== "") &&
                <Link className="bg-blue-500 p-2 rounded-[4px] hover:bg-blue-800"
                      href={`/pokemon/${didYouMeanStr}`}>Did you
                    mean &quot;{toCapitalize(didYouMeanStr)}&quot;?</Link>
            }
            <div className="container flex gap-2 justify-between">

                <select className={"w-3/4"} value={currentSelectValue} name={"pokeSelect"} onChange={handlePokemonChange}>
                    {/*[...pokemonHistory].sort()//if we want this :] sort without changing history*/}
                    {pokemonHistory.map((poke) => {
                        return <option value={poke} key={poke}>{poke}</option>;
                    })}
                </select>
                <p className="flex-1 flex justify-center content-center">{pokemonHistory.length}</p>

            </div>

            <input autoFocus={true} className="text-black rounded-[4px] p-[4px]"
                   placeholder={"enter a pokemon to find!"} onChange={(e) => {
                setPokemonInputValue(e.target.value);
            }}/>
            {/*<button onClick={() => {*/}
            {/*    sessionStorage.removeItem("pokemonHistory");*/}
            {/*    router.refresh();*/}
            {/*}}>Clear History*/}
            {/*</button>*/}
        </form>
    );
}
