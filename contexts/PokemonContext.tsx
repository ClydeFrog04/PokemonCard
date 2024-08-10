"use client";
/**
 * @author Randi Egan
 * @date   Aug/09/2024
 */


import React, {createContext, Dispatch, JSX, PropsWithChildren, SetStateAction, useState} from "react";

const pokemonHistorySessionStorage = sessionStorage.getItem("pokemonHistory");

const defaultState = {
    pokemonHistory: pokemonHistorySessionStorage === null ? [] : JSON.parse(pokemonHistorySessionStorage),
}

interface IPokemonState {
    pokemonHistory: string[];
    setPokemonHistory: Dispatch<SetStateAction<string[]>>;
}

export const PokemonStateContext = createContext<IPokemonState>({} as IPokemonState);


export const PokemonStateProvider: React.FC<JSX.Element> =  ({children}: PropsWithChildren<React.ReactNode>) => {
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
