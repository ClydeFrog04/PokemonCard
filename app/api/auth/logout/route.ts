// import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth"
import { getIdToken } from "@/utils/sessionTokenAccessor";
import {options} from "@/app/api/auth/[...nextauth]/authOptions";

export async function GET() {
    const session = await getServerSession(options);

    if (session) {

        const idToken = await getIdToken();

        // this will log out the user on Keycloak side http://localhost:8181/realms/flavoura/protocol/openid-connect/logout
        const url = `${process.env.END_SESSION_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL as string)}`;

        try {
            console.log("URL WAS", url);
            const resp = await fetch(url, { method: "GET" });
        } catch (err) {
            console.error(err);
            return new Response({ status: 500 } as any);
        }
    }
    return new Response({ status: 200 } as any);
}