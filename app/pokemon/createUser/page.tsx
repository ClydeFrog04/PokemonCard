"use client"
import {createUser} from "@/app/pokemon/[pokemon]/serverActions";


export default function CreateUser (){

    const handleClick = async (event: React.MouseEvent) => {
        const didCreate = await createUser();
        console.log("did we?", didCreate);
    }

    return (
        <main className="min-h-screen flex justify-center items-center">
            <button className="bg-green-400 text-black p-2 rounded-3xl hover:cursor-pointer hover:bg-green-800 hover:text-white" onClick={handleClick}>Create Randi!</button>
        </main>
    )
}