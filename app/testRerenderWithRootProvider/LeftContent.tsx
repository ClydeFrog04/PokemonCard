"use client";
import React, {PropsWithChildren, useContext, useEffect, useState} from "react";
import {AnotherContextStateContext} from "@/contexts/AnotherContext";

export default function LeftContent(params?: PropsWithChildren) {
    const {name, setName} = useContext(AnotherContextStateContext);

    return (
        <main className="flex  flex-col items-center justify-between p-24">
            {name === "Randi" ?
                <div>Hello {name}</div> :
                <>{name}</>
            }
            <button onClick={ (event) => {
                setName( (prevName) => {
                    if(prevName.toLowerCase() === "randi"){
                        return "Vera";
                    }
                    return "Randi";
                });
            }}>change name</button>
        </main>
    );
}
