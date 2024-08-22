"use client";
import React, {PropsWithChildren, useContext, useEffect, useState} from "react";
import {PokemonStateContext} from "@/contexts/PokemonContext";

export default function RightContent(params?: PropsWithChildren) {
    const {pokemonHistory} = useContext(PokemonStateContext);

    return (
        <main className="flex  flex-col items-center justify-between p-24">
            {pokemonHistory.length} pokemon found
        </main>
    );
}
