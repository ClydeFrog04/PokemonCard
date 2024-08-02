"use client";
import {useEffect, useState} from "react";
import {PokemonT} from "@/app/pokemon/PokemonAPITypes";
import Image from "next/image";

export default function Yay() {
    const [data, setData] = useState<PokemonT | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [pokemonSprite, setPokemonSprite] = useState("");

    const baseUrl = "https://pokeapi.co/api/v2/pokemon/eevee";

    useEffect(() => {
        fetch(baseUrl)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
                lookForFrontSprite(data);
                console.log("data:", JSON.stringify(data));
            });
    }, []);

    const lookForFrontSprite = (data: PokemonT | null) => {
        const defaultLogo = "https://press.pokemon.com/en/products/Pokemon-Logo-55300";
        if (data === null) return defaultLogo;
        const sprite = data.sprites.front_default;
        setPokemonSprite(sprite || defaultLogo);//default pokemon logo for backup :]

    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {!isLoading &&
                <Image
                    loader={ () => pokemonSprite}
                    src={pokemonSprite}
                    alt="pokemon Logo"
                    className=""
                    width={100}
                    height={24}
                    priority
                />
            }

        </main>
    );
}
