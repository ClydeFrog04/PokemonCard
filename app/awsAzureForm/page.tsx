"use client";
import React, {useEffect, useState} from "react";
import InputWithLabel from "@/app/awsAzureForm/InputWithLabel";

const defaultState: defaultStateT = {
    profile: "",
    user: "",
    subnetInfo: "",
    tags: "",
    onemoreThing: "",
};

type defaultStateT = {
    [index: string]: string;
    profile: string;
    user: string;
    subnetInfo: string;
    tags: string;
    onemoreThing: string;

}
export default function AwsAzureForm({params}: { params: { pokemon: string } }) {
    const TAG = "[awsAzureForm.tsx]";
    const [env, setEnv] = useState<"azure" | "aws">("azure");
    const [useAzure, setUseAzure] = useState(false);
    const [data, setData] = useState<defaultStateT>(defaultState);

    useEffect(() => {
        // localStorage.setItem("data", JSON.stringify(data));
        const localData = sessionStorage.getItem("data");
        if (localData !== null) {
            console.log("locatdata was:", localData);
            setData(JSON.parse(localData));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let newData = {...data};
        for (const label in data) {
            // let value = data[label].split("");
            // for (let i = 0; i < value.length / 2; i++) {
            //     const a = value[i];
            //     const b = value[value.length - i - 1];
            //     value[i] = b;
            //     value[value.length - i - 1] = a;
            // }
            // newData = {...newData, [label]: value.join("")};
            newData = {...newData, [label]: reverseString(data[label])};
        }
        setData({...newData});
    };

    const reverseString = (string: string) => {
        return string.split("").reverse().join("");
    };

    return (
        // min-h-screen
        <main className="flex  flex-col items-center justify-between p-24">
            <label htmlFor="isAzure" className="flex flex-col">Are you using azure?
                <input id={"isAzure"} type="checkbox" checked={useAzure} onChange={(e) => {
                    setUseAzure(!useAzure);
                }}/>
            </label>

            <form action="" className={"flex flex-wrap"} onSubmit={handleSubmit}>
                <InputWithLabel label={"profile"} useAzure={useAzure} data={data} setData={setData}/>
                <InputWithLabel label={"subnetInfo"} useAzure={useAzure} data={data} setData={setData}/>
                <InputWithLabel label={"tags"} useAzure={useAzure} data={data} setData={setData}/>
                <InputWithLabel label={"user"} useAzure={useAzure} data={data} setData={setData}/>
                <InputWithLabel label={"onemoreThing"} useAzure={useAzure} data={data} setData={setData}/>

                <button>Reverse those strings!</button>
            </form>
        </main>
    );
}
