"use client"
import React, {ReactNode} from "react";
import {SessionProvider} from "next-auth/react";

const SessionProviderWrapper = ({children, ...rest}: {children: ReactNode}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default SessionProviderWrapper;