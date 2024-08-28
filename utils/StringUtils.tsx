import didYouMean from "didyoumean";
import names from "@/app/pokemon/names.json";

/**
 * returns a Capitalized version of the given string
 * @param str the string to get the capitalised version of
 */
export const toCapitalize = (str: string) => {//todo: we don't need to export this to use it?
    const split = str.split(" ");
    const caps = split.map((word) => {
        const firstLetter = word.charAt(0).toUpperCase();
        const rest = word.substring(1);
        return firstLetter + rest;
    });
    return caps.join("");
};

export const getDidYouMeanString = (attempt: string): string => {
    //todo: this returns null when there is no match, rather than the array or string it claims, need a better default system:[
    const didYouMeanStr = didYouMean(attempt, names);
    console.log(didYouMeanStr);
    if (Array.isArray(didYouMeanStr)) {
        console.log("we have an array:", JSON.stringify(didYouMeanStr));
        return didYouMeanStr[0];
    }
    if (didYouMeanStr === null) {
        return "none";
    }
    console.log("no array, but it failed:", didYouMeanStr);
    return didYouMeanStr;
};