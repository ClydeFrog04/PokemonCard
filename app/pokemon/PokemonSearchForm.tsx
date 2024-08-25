"use client";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {toCapitalize} from "@/utils/StringUtils";
import {PokemonDBEntry} from "@/app/pokemon/PokemonDBTypes";


type ParamsT = {
    pokemonHistory: PokemonDBEntry[];
    // handleFormSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
    // currentSelectValue: string;
    showDidYouMean?: boolean;
    didYouMeanStr: string;
    currentPokemonParam: string;
}

export default function PokemonSearchForm({pokemonHistory, didYouMeanStr, currentPokemonParam}: ParamsT) {
    const [pokemonInputValue, setPokemonInputValue] = useState("");
    const [currentSelectValue, setCurrentSelectValue] = useState<string>(pokemonHistory[0].name);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();


    useEffect(() => {
        setCurrentSelectValue(currentPokemonParam);
    }, []);


    function handlePokemonChange(e: React.ChangeEvent<HTMLSelectElement>) {
        // router.push(e.target.value);
        setCurrentSelectValue(e.target.value);
        const userId = searchParams.get("userId");
        let attachParams = "";
        if(userId !== null){
            attachParams = `?userId=${userId}`;
        }
        console.log("path was:", pathname);
        // router.push(e.target.value + attachParams);
        router.push("/pokemon/" + e.target.value + attachParams);
    }

    const handleFormSubmit = (e: React.FormEvent) => {//todo: create a component for this form!
        e.preventDefault();
        const userId = searchParams.get("userId");
        let attachParams = "";
        if(userId !== null){
            attachParams = `?userId=${userId}`;
        }
        router.push("/pokemon/" + pokemonInputValue + attachParams);
    };

    return (
        <form className={"grid gap-4"} action="" onSubmit={handleFormSubmit}>
            {(didYouMeanStr !== "none" && didYouMeanStr !== "") &&
                <Link className="bg-blue-500 p-2 rounded-[4px] hover:bg-blue-800"
                      href={`/pokemon/${didYouMeanStr}`}>Did you
                    mean &quot;{toCapitalize(didYouMeanStr)}&quot;?</Link>
            }
            <select className={""} value={currentSelectValue} name={"pokeSelect"} onChange={handlePokemonChange}>
                {pokemonHistory.map((poke) => {
                    return <option value={poke.name} key={poke.number}>{poke.name}</option>;
                })}
            </select>
            <input autoFocus={true} className="text-black rounded-[4px] p-[4px]"
                   placeholder={"enter a pokemon to find!"} onChange={(e) => {
                setPokemonInputValue(e.target.value);
            }}/>
        </form>
    );
}
