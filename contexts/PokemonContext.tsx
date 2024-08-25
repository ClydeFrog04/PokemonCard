"use client";
/**
 * @author Randi Egan
 * @date   Aug/09/2024
 */


import React, {createContext, Dispatch, JSX, PropsWithChildren, SetStateAction, useEffect, useState} from "react";
import {getUserPokemonHistory} from "@/app/pokemon/[pokemon]/serverActions";
import {PokemonDBEntry} from "@/app/pokemon/PokemonDBTypes";

// let pokemonHistorySessionStorage = null;
// if(typeof window !== undefined){
//     pokemonHistorySessionStorage = sessionStorage.getItem("pokemonHistory");
// }
const USER_ID = 1;
// const pokemonHistorySessionStorage =

const defaultState = {
    pokemonHistory: []//pokemonHistorySessionStorage === null ? [] : JSON.parse(pokemonHistorySessionStorage),
}

interface IPokemonState {
    pokemonHistory: PokemonDBEntry[];
    setPokemonHistory: Dispatch<SetStateAction<PokemonDBEntry[]>>;
}

export const PokemonStateContext = createContext<IPokemonState>({} as IPokemonState);


export const PokemonStateProvider: React.FC<PropsWithChildren<React.ReactNode>> = ({children}: PropsWithChildren<React.ReactNode>) => {
    const [pokemonHistory, setPokemonHistory] = useState<PokemonDBEntry[]>(defaultState.pokemonHistory);

    useEffect(() => {
        getUserPokemonHistory(USER_ID).then((res) => {
            setPokemonHistory(res);
        });
    }, []);


    return (
        <PokemonStateContext.Provider
            value={{
                pokemonHistory,
                setPokemonHistory
            }}
        >
            {children}
        </PokemonStateContext.Provider>
    )
}
