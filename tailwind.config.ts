import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extend:{
        colors: {
            normal: "rgb(84, 84, 54)",
            fire: "rgb(172, 79, 12)",
            water: "rgb(14, 50, 137)",
            electric: "rgb(130, 105, 4)",
            grass: "rgb(95, 144, 45)",
            ice: "rgb(37, 99, 99)",
            fighting: "rgb(154, 38, 32)",
            poison: "rgb(128, 51, 128)",
            ground: "rgb(100, 79, 20)",
            flying: "rgb(39, 15, 112)",
            psychic: "rgb(149, 6, 49)",
            bug: "rgb(134, 147, 26)",
            rock: "rgb(147, 128, 45)",
            ghost: "rgb(90, 70, 122)",
            dragon: "rgb(53, 6, 169)",
            dark: "rgb(90, 70, 58)",
            steel: "rgb(49, 49, 73)",
            fairy: "rgb(86, 18, 25)",
        }
    },
    safelist: [
        {
            pattern: /bg-.+/,
        },
        'before:bg-normal',
        'before:bg-fire',
        'before:bg-water',
        'before:bg-electric',
        'before:bg-grass',
        'before:bg-ice',
        'before:bg-fighting',
        'before:bg-poison',
        'before:bg-ground',
        'before:bg-flying',
        'before:bg-psychic',
        'before:bg-bug',
        'before:bg-rock',
        'before:bg-ghost',
        'before:bg-dragon',
        'before:bg-dark',
        'before:bg-steel',
        'before:bg-fairy',
        {//this pattern not working for some reason:[[
            pattern: /before:bg-.+/g
        }
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                default:"#000",
                normal: "#A8A878",
                fire: "#F08030",
                water: "#6890F0",
                electric: "#F8D030",
                grass: "#78C850",
                ice: "#98D8D8",
                fighting: "#C03028",
                poison: "#A040A0",
                ground: "#E0C068",
                flying: "#A890F0",
                psychic: "#F85888",
                bug: "#A8B820",
                rock: "#B8A038",
                ghost: "#705898",
                dragon: "#7038F8",
                dark: "#705848",
                steel: "#B8B8D0",
                fairy: "#F0B6BC",
            }
        },
    },
    plugins: [],
};
export default config;
