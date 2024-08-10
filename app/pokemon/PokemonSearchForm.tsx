"use client";
import Link from "next/link";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {toCapitalize} from "@/utils/StringUtils";


type ParamsT = {
    pokemonHistory: string[];
    // handleFormSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
    // currentSelectValue: string;
    showDidYouMean?: boolean;
    didYouMeanStr: string;
}

export default function PokemonSearchForm({pokemonHistory,didYouMeanStr}: ParamsT) {
    const [pokemonInputValue, setPokemonInputValue] = useState("");
    const [currentSelectValue, setCurrentSelectValue] = useState(pokemonHistory[0]);
    const router = useRouter();


    function handlePokemonChange(e: React.ChangeEvent<HTMLSelectElement>) {
        // router.push(e.target.value);
        setCurrentSelectValue(e.target.value);
        console.log("e");
    }

    const handleFormSubmit = (e: React.FormEvent) => {//todo: create a component for this form!
        e.preventDefault();
        router.push(pokemonInputValue);
    };

    return (
        <form className={"grid gap-4"} action="" onSubmit={handleFormSubmit}>
            {didYouMeanStr !== "none" && //todo: need to make sure this doesn't also render when the string is empty!
            <Link className="bg-blue-500 p-2 rounded-[4px] hover:bg-blue-800"
                  href={`/pokemon/${currentSelectValue}`}>Did you
                mean &quot;{toCapitalize(currentSelectValue)}&quot;?</Link>
            }
            <select className={""} value={currentSelectValue} name={"pokeSelect"} onChange={handlePokemonChange}>
                {pokemonHistory.map((poke) => {
                    return <option value={poke} key={poke}>{poke}</option>;
                })}
            </select>
            <input autoFocus={true} className="text-black rounded-[4px] p-[4px]"
                   placeholder={"enter a pokemon to find!"} onChange={(e) => {
                setPokemonInputValue(e.target.value);
            }}/>
        </form>
    );
}
