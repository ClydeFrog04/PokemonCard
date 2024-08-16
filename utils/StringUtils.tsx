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
