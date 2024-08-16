import React from "react";
// import {expect, test, vi} from "vitest";
import {act, render, screen} from "@testing-library/react";
import Pokemon from "@/app/pokemon/[pokemon]/page";

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

test("Pokemon", async () => {
    const pokemon = render(<Pokemon params={{pokemon: "eevee"}}/>);
    const main = screen.getByRole("main");
    expect(main).toBeDefined();

    screen.debug();

});
