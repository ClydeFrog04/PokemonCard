"use client";
import PokemonSearchForm from "@/app/pokemon/PokemonSearchForm";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {getUserByUsername, getUserPokemonHistory} from "@/app/pokemon/[pokemon]/serverActions";
import {PokemonDBEntry} from "@/app/pokemon/PokemonDBTypes";
import {toCapitalize} from "@/utils/StringUtils";
import {revalidatePath} from "next/cache";

export default function PokemonHome() {
    const searchParams = useSearchParams().get("userId");
    const router = useRouter();
    const [userId, setUserId] = useState(Number(searchParams || 1));
    const [userSearchName, setUserSearchName] = useState("");


    const [pokemonHistory, setPokemonHistory] = useState<PokemonDBEntry[]>([]);

    useEffect(() => {
        getUserPokemonHistory(userId)
            .then((res) => {
                console.log("history was:", res);
                setPokemonHistory(res);
            }).catch(console.error);
    }, [userId]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setUserSearchName(event.target.value);
    }


    return (
        <main className="flex justify-center items-center flex-col min-w-full min-h-screen gap-4">
            <span>pokemon home!</span>

            {pokemonHistory.length > 0 &&
                <PokemonSearchForm pokemonHistory={pokemonHistory} showDidYouMean={false} didYouMeanStr={""}
                                   currentPokemonParam={pokemonHistory[0].name}/>
            }
            <form action="" onSubmit={(event) => {
                event.preventDefault();
                console.log("looking for ", toCapitalize(userSearchName));
                getUserByUsername(toCapitalize(userSearchName))
                    .then((res) => {
                        router.push(`/pokemon?userId=${res.id}`);
                        setUserId(res.id);
                    }).catch(console.error);
            }}>
                <input
                    className="text-black"
                    placeholder="enter username"
                    onChange={handleInputChange}
                />
            </form>
        </main>
    );
}