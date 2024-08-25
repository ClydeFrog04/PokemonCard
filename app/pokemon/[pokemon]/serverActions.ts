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
            name: "Kristion",
            PokemonHistory: {
                create: [
                    // {
                    //     name: "Eevee",
                    //     type: "normal",
                    //     number: 133
                    // }
                ]
            }
        }
    });
}

export async function getUserPokemonHistory(id: number) {
    return prisma.pokemon.findMany({
        where: {
            userId: id
        }
    });
}

export async function addPokemonToUserHistory(userId: number, pokemon: { name: string, type: string, number: number }) {
    const pokeId = await prisma.pokemon.findFirst({where:{name: pokemon.name, userId: userId}});
    return prisma.pokemon.upsert({
        create: {
            userId: userId,
            name: pokemon.name,
            type: pokemon.type,
            number: pokemon.number,
        },
        update: {},
        where:{id: pokeId === null ? 0 : pokeId.id , userId: userId}
    });
}

function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}