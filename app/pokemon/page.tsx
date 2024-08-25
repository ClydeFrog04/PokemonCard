"use client";
import PokemonSearchForm from "@/app/pokemon/PokemonSearchForm";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {getUserByUsername, getUsername, getUserPokemonHistory} from "@/app/pokemon/[pokemon]/serverActions";
import {PokemonDBEntry} from "@/app/pokemon/PokemonDBTypes";
import {toCapitalize} from "@/utils/StringUtils";
import {revalidatePath} from "next/cache";
import {catchClause} from "@babel/types";

export default function PokemonHome() {
    const searchParams = useSearchParams().get("userId");
    const router = useRouter();
    const [userId, setUserId] = useState(Number(searchParams || 1));
    const [currentUsername, setCurrentUsername] = useState("");

    const [userSearchName, setUserSearchName] = useState("");


    const [pokemonHistory, setPokemonHistory] = useState<PokemonDBEntry[]>([]);

    useEffect(() => {
        getUserPokemonHistory(userId)
            .then((res) => {
                console.log("history was:", res);
                setPokemonHistory(res);
            }).catch(console.error);
        getUsername(userId)
            .then((res) => {
                setCurrentUsername(res);
            }).catch(console.error);
    }, [userId]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setUserSearchName(event.target.value);
    }


    return (
        <main className="flex justify-center items-center flex-col min-w-full min-h-screen gap-4">
            <span>Welcome to your PokeDex {currentUsername}!</span>

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