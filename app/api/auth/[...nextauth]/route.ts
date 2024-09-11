import NextAuth from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/authOptions";

const handler = NextAuth(options);

export {handler as GET, handler as POST};