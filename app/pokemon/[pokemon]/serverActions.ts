"use server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
export const getUsersPokemonHistory = async () => {
    console.log("find me in the server");
    await wait(2000);
    return "EEVEE";
    // return setTimeout(() => {
    //     return JSON.parse(JSON.stringify({pokemon: "EEVEE"}));
    // }, 1000);
};

export async function createUser() {
    return prisma.user.create({
        data: {
            name: "Randi",
            PokemonHistory: {
                create: [
                    {
                        name: "Eevee",
                        type: "normal",
                        number: 133
                    }
                ]
            }
        }
    });
}

export async function getUserPokemonHistory(id: number){
    return prisma.pokemon.findMany({
        where:{
            userId: id
        }
    });
}

function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}