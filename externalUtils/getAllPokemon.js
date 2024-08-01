// import {writeFile} from "fs";
const fs = require("fs");

function fetchAllPokemon() {
    console.log("getting!");
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1500")
        .then(response => response.json())
        .then(allPokemon => {
            console.log(allPokemon.results[0]);
            const names = allPokemon.results.map((pokemon) => {
                return pokemon.name;
            });

            names.sort();
            console.log(names[0]);


            fs.writeFile("names.json", JSON.stringify({names}), (err) => {
                if (err) throw err;
            });
        });
}

fetchAllPokemon();
