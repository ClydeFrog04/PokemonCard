import {Account, NextAuthOptions} from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import {encrypt} from "@/utils/encryption";
import {jwtDecode} from "jwt-decode";
import {JWT} from "next-auth/jwt";
import {getUserByUsername} from "@/app/pokemon/[pokemon]/serverActions";


export const options: NextAuthOptions = {

    callbacks:{
        async redirect({url, baseUrl}) {
            console.log("redirect called", url, baseUrl);
            return `${baseUrl}/pokemon`;
        },
        async jwt({token, account}: {token: JWT & {expires_at: number}, account: Account} & any) {
            if (process.env.NODE_ENV === "development") {
                // console.log({token});
            }

            //todo: this did not work at all...
            const nowTimeStamp = Math.floor(Date.now() / 1000);
            if (account) {//todo: this was recommended by the video im watching
                console.log("account",{account});
                if(!account.access_token.startsWith("ghu")){//should not decode github access token, really should check for if using keycloak and only decode in that case
                    token.decoded = jwtDecode(account.access_token as string);
                }
                token.accessToken = account.access_token;
                token.id_token = account.id_token;
                token.expires_at = account.expires_at; //|| 0;//setting a default of zero because it's safer to assume we are expired than allow an infinite token, might need to make sure that is the best default
                token.refresh_token = account.refresh_token;
                return token;
            } else if(nowTimeStamp < token.expires_at){
                return token;
            }
            console.warn("token has expired we should implement a refresh or whatever")
            return token;
        },
        async session({ session, token }: any) {
            // Send properties to the client
            // console.log("SESSION TOKEN WAS:", token.id_token);
            session.access_token = encrypt(token.access_token); // see utils/sessionTokenAccessor.js
            session.id_token = encrypt(token.id_token);  // see utils/sessionTokenAccessor.js
            session.roles = token.decoded.realm_access.roles;
            session.error = token.error;
            const firstName = token.decoded.given_name;
            session.firstName = firstName;

            try{
                console.log("first:", firstName);
                const pokeDbUserId = (await getUserByUsername(firstName)).id;//todo: we should use something other than first name and make it so when a user registers, we add them to the db!
                console.log("db userid:", pokeDbUserId);
                session.pokeDBUserId = pokeDbUserId;
            } catch (error){
                console.error(error);
            }
            return session;
        },
    },
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_ID || "",
            clientSecret: process.env.KEYCLOAK_SECRET || "",
            issuer: process.env.AUTH_ISSUER
        })
    ]
};