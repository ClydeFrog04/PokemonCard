import Cryptr from "cryptr";

export function encrypt(text: any) {
    // console.log("ENCRYPT CALLED:", text);
    if (text === undefined) return "";
    const secretKey = process.env.NEXTAUTH_SECRET as string;
    const cryptr = new Cryptr(secretKey);

    const encryptedString = cryptr.encrypt(text);
    return encryptedString;
}

export function decrypt(encryptedString: any) {
    if (encryptedString === undefined) return "";
    const secretKey = process.env.NEXTAUTH_SECRET as string;
    const cryptr = new Cryptr(secretKey);

    const text = cryptr.decrypt(encryptedString);
    return text;
}