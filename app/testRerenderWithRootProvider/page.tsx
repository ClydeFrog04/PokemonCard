"use client";
import React, {ElementType, PropsWithChildren, useEffect, useState} from "react";
import {AnotherContextStateProvider} from "@/contexts/AnotherContext";
import LeftContent from "@/app/testRerenderWithRootProvider/LeftContent";
import {PokemonStateProvider} from "@/contexts/PokemonContext";
import RightContent from "@/app/testRerenderWithRootProvider/RightContent";
import {RootProvider} from "@/contexts/RootProvider";

export default function TestRerenderWithRootProvider(params: any) {


    return (
        <main className="flex  flex-col items-center justify-between">
            <AnotherContextStateProvider key={"4"} props={params} type={"f"}>
                <LeftContent/>
            </AnotherContextStateProvider>
            <PokemonStateProvider type={"4"} props={params} key={"d"}>
                <RightContent/>
            </PokemonStateProvider>
        </main>
        // <main className="flex  flex-col items-center justify-between">
        //     <RootProvider>
        //         <LeftContent/>
        //         <RightContent/>
        //     </RootProvider>
        // </main>
    );
}
