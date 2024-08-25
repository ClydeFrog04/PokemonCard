"use client";
/**
 * @author Randi Egan
 * @date   Aug/09/2024
 */


import React, {createContext, Dispatch, JSX, PropsWithChildren, SetStateAction, useState} from "react";

let pokemonHistorySessionStorage = null;
console.log("window was", typeof window);
if(typeof window !== undefined){
    pokemonHistorySessionStorage = sessionStorage.getItem("pokemonHistory");
}

const defaultState = {
    pokemonHistory: pokemonHistorySessionStorage === null ? [] : JSON.parse(pokemonHistorySessionStorage),
}

interface IPokemonState {
    pokemonHistory: string[];
    setPokemonHistory: Dispatch<SetStateAction<string[]>>;
}

export const PokemonStateContext = createContext<IPokemonState>({} as IPokemonState);


export const PokemonStateProvider: React.FC<PropsWithChildren<React.ReactNode>> =  ({children}: PropsWithChildren<React.ReactNode>) => {
    const [pokemonHistory, setPokemonHistory] = useState<string[]>(defaultState.pokemonHistory);


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
