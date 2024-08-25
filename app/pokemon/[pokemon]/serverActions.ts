"use server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const doesUserHavePokemon = async (name: string, userId: number) => {
    const poke = await prisma.pokemon.findFirst({
        where: {
            userId: userId,
            name: name
        }
    });
    return poke !== null;
};

export async function doesUserExist(name: string) {
    return prisma.user.findFirst({
        where: {
            name: name
        }
    });
}

export async function createUser(name: string) {
    const userFound = await doesUserExist(name);
    if (userFound !== null) {
        return userFound;
    }
    return prisma.user.create({
        data: {
            name: name,
            PokemonHistory: {
                create: []
            }
        }
    });
}

export async function deleteAllPokemonForUser(userId: number) {
    return prisma.pokemon.deleteMany({
        where: {
            userId: userId
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

export async function addPokemonToUserHistoryIfNotExists(userId: number, pokemon: {
    name: string,
    type: string,
    number: number
}) {
    const pokeId = await prisma.pokemon.findFirst({where: {name: pokemon.name, userId: userId}});
    return prisma.pokemon.upsert({
        create: {
            userId: userId,
            name: pokemon.name,
            type: pokemon.type,
            number: pokemon.number,
        },
        update: {},
        where: {id: pokeId === null ? 0 : pokeId.id, userId: userId}
    });
}

function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}