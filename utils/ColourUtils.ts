/**
 *
 * @param colour a string in the format rgb(r, g, b);
 *               this colour comes from the PokemonAPITypes using the Pokemon element type to pick the appropriate colour
 */
export const getContrastYIQ = (colour: string): string => {
    const split = colour.match(/rgb\(|\d+|\)/g)?.filter((value) => {
        //var result = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        const num = parseInt(value);
        return !isNaN(num);
    });
    // console.log("split", split);
    if (split === undefined) {
        //default to black- maybe not the best!
        return "black";
    }
    const r = parseInt(split[0]);
    const g = parseInt(split[1]);
    const b = parseInt(split[2]);

    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? "black" : "white";
};