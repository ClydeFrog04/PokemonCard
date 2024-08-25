"use client"
import {createUser, deleteAllPokemonForUser, doesUserExist} from "@/app/pokemon/[pokemon]/serverActions";
import {toCapitalize} from "@/utils/StringUtils";
import React from "react";


export default function CreateUser ({params}: {params: {username: string}}){

    const handleClick = async (event: React.MouseEvent) => {
        const didCreate = await createUser(toCapitalize(params.username));
        console.log("did we?", didCreate);
    }

    const handleDelete = async (event: React.MouseEvent) => {
        event.preventDefault();
        const user = await doesUserExist(toCapitalize(params.username));
        if(user !== null){
            const deleted = await deleteAllPokemonForUser(user.id);
            console.log("deleted:", deleted);
        }
    }

    return (
        <main className="min-h-screen flex justify-center items-center flex-col gap-4">
            <button className="bg-green-400 text-black p-2 rounded-3xl hover:cursor-pointer hover:bg-green-800 hover:text-white"
                    onClick={handleClick}
            >Create {toCapitalize(params.username)}!</button>
            <button className="bg-green-400 text-black p-2 rounded-3xl hover:cursor-pointer hover:bg-green-800 hover:text-white"
                    onClick={handleDelete}
            >Delete pokemon for {toCapitalize(params.username)}!</button>
        </main>
    )
}