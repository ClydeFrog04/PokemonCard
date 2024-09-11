import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/authOptions";
import {getIdToken} from "@/utils/sessionTokenAccessor";
import {jwtDecode} from "jwt-decode";

export async function GET() {
    const session = await getServerSession(options);

    if (session) {
        const idToken = await getIdToken();
        console.log("idToken:", idToken);
        if(idToken){
            console.log(jwtDecode(idToken));
        }
        return Response.json({idToken: idToken}, {status: 200});
    }
    return new Response({status: 404} as any);
}