import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/authOptions";
import {decrypt} from "./encryption";

export async function getAccessToken() {

    const session = await getServerSession(options);
    console.log("SESSION WAS:", session);
    if (session) {
        // @ts-ignore
        const accessTokenDecrypted = decrypt(session.access_token);
        console.log("SESSION WAS:", accessTokenDecrypted);
        return accessTokenDecrypted;
    }
    return null;
}

export async function getIdToken() {

    const session = await getServerSession(options);
    console.log("SESSION WAS:", session);

    if (session) {
        // @ts-ignore
        const idTokenDecrypted = decrypt(session.id_token);
        console.log("decr:", idTokenDecrypted);
        // @ts-ignore
        console.log("encr:", session.id_token);
        return idTokenDecrypted;
    }
    return null;
}