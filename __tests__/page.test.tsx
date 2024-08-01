import {expect, test, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import Pokemon from "@/app/pokemon/[pokemon]/page";


vi.mock('next/navigation', async (importOriginal) => {
    const actual = await importOriginal<typeof import('next/navigation')>();
    const { useRouter } = await vi.importActual<typeof import('next-router-mock')>('next-router-mock');
    const usePathname = vi.fn().mockImplementation(() => {
        const router = useRouter();
        return router.pathname;
    });
    const useSearchParams = vi.fn().mockImplementation(() => {
        const router = useRouter();
        return new URLSearchParams(router.query?.toString());
    });
    return {
        ...actual,
        useRouter: vi.fn().mockImplementation(useRouter),
        usePathname,
        useSearchParams,
    };
});

test("Pokemon", () => {
    render(<Pokemon params={{pokemon: "eevee"}}/>);
    expect(screen.getByRole("main")).toBeDefined();
    // vi.waitFor

});
