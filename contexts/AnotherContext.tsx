"use client";
/**
 * @author Randi Egan
 * @date   Aug/09/2024
 */


import React, {createContext, Dispatch, JSX, PropsWithChildren, SetStateAction, useState} from "react";


const defaultState = {
    name: "Randi",
    lastName:"Egan"
}

interface IAnotherContextState {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    lastName: string;
    setLastName: Dispatch<SetStateAction<string>>;
}

export const AnotherContextStateContext = createContext<IAnotherContextState>({} as IAnotherContextState);


export const AnotherContextStateProvider: React.FC<PropsWithChildren<React.ReactNode>> =  ({children}: PropsWithChildren<React.ReactNode>) => {
    const [name, setName] = useState(defaultState.name);
    const [lastName, setLastName] = useState(defaultState.lastName);



    return (
        <AnotherContextStateContext.Provider
            value={{
                name,
                setName,
                lastName,
                setLastName
            }}
        >
            {children}
        </AnotherContextStateContext.Provider>
    )
}
