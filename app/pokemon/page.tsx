"use client";
import PokemonSearchForm from "@/app/pokemon/PokemonSearchForm";
import {useRouter, useSearchParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import {getUserByUsername, getUsername, getUserPokemonHistory} from "@/app/pokemon/[pokemon]/serverActions";
import {PokemonDBEntry} from "@/app/pokemon/PokemonDBTypes";
import {toCapitalize} from "@/utils/StringUtils";
import {revalidatePath} from "next/cache";
import {catchClause} from "@babel/types";
import {useSession} from "next-auth/react";
import {getIdToken} from "@/utils/sessionTokenAccessor";
import {decrypt} from "@/utils/encryption";

export default function PokemonHome() {
    const session = useSession();
    const searchParams = useSearchParams().get("userId");
    const router = useRouter();
    const [userId, setUserId] = useState(Number(searchParams || 1));//todo: redirect url from login should add search param for found user
    const [currentUsername, setCurrentUsername] = useState("");

    const [userSearchName, setUserSearchName] = useState("");


    const [pokemonHistory, setPokemonHistory] = useState<PokemonDBEntry[]>([]);

    // function isPokemonGen1(){
    //     return this.getPokemonNumber() <= 151;
    // }
    useEffect(() => {
        if(session.status === "authenticated"){
            fetch("/api/auth/idToken", {method: "GET"}).then((res) => res.json()).then((res) => {
                console.log(res);
            }).catch(console.error);
        }
    }, [session.status]);

    useEffect(() => {
        getUserPokemonHistory(userId)
            .then((res) => {
                setPokemonHistory(res);
                
            }).catch(console.error);
        getUsername(userId)
            .then((res) => {
                setCurrentUsername(res);
            }).catch(console.error);
    }, [userId]);
    
    useEffect(() => {
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        let count = 0;
        pokemonHistory.forEach((pokemon) => {
           if(pokemon.number > 151) {
               count++;
               console.log(`Pokemon ${pokemon.name} is NOT a gen 1 pokemon.`);
           }
        });
        console.log(`You are missing ${151 - pokemonHistory.length + count} from gen 1. You have ${count} pokemon that are not in gen 1.`);
    }, [pokemonHistory]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setUserSearchName(event.target.value);
    }


    return (
        <main className="flex justify-center items-center flex-col min-w-full min-h-screen gap-4">
            <button onClick={(event) => {
                event.preventDefault();
                logout();
            }}>Log Out</button>
            <span>Welcome to your PokeDex {currentUsername}!</span>
            <span>You have caught {pokemonHistory.length} Pokemon</span>

            {/*{pokemonHistory.length > 0 &&*/}
                <PokemonSearchForm pokemonHistory={pokemonHistory} showDidYouMean={false} didYouMeanStr={""}
                                   currentPokemonParam={pokemonHistory.length > 0 ? pokemonHistory[0].name : ""}/>
            {/*}*/}
            <form className="flex flex-col gap-4" onSubmit={(event) => {
                event.preventDefault();
                console.log("looking for ", toCapitalize(userSearchName));
                getUserByUsername(toCapitalize(userSearchName))
                    .then((res) => {
                        console.log("res", res);
                        router.push(`/pokemon?userId=${res.id}`);
                        setUserId(res.id);
                        setUserSearchName("");
                    }).catch(console.error);
            }}>
                <input
                    className="text-black"
                    placeholder="enter username"
                    onChange={handleInputChange}
                />
                <button className="bg-red-700 p-2 rounded-3xl hover:bg-red-500" onClick={() => {
                    router.push(`/pokemon/createUser/${currentUsername}`);
                }}>Delete all pokemon...</button>
            </form>
        </main>
    );
}