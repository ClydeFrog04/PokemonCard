import React from "react";
// import {expect, test, vi} from "vitest";
import {act, render, screen} from "@testing-library/react";
import Pokemon from "@/app/pokemon/[pokemon]/page";
import {RootProvider} from "@/contexts/RootProvider";

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

jest.mock("");

test("Pokemon", async () => {
    const pokemon = render(<RootProvider>
            <Pokemon params={{pokemon: "eevee"}}/>
        </RootProvider>
    );
    screen.debug();
    // const main = screen.getByRole("main");
    // await screen.findByRole("img");
    // expect(main).toBeDefined();
    await pause();
    screen.debug();

});


const pause = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            // @ts-ignore
            resolve();
        }, 15000);
    });
};
