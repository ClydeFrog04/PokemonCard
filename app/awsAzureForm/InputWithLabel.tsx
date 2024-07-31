import React, {ReactElement, useRef, useState} from "react";
import {labels} from "@/app/awsAzureForm/types";

interface InputWithLabelProps {

}

//todo: better typing
const InputWithLabel = (params: { label: keyof typeof labels, children?: ReactElement, useAzure: boolean, data: any, setData: React.SetStateAction<any> }) => {
    const TAG = "[InputWithLabel.tsx]";
    const {useAzure, data, setData} = params;
    const timer = useRef<NodeJS.Timeout>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value, JSON.stringify(data));
        const newData = {...data, [params.label]: e.target.value};
        setData(newData);
        clearTimeout(timer.current);
        timer.current = setTimeout( () => {
            sessionStorage.setItem("data", JSON.stringify(newData));
            console.log("setting session storage", JSON.stringify(newData));
        },1000)
    }

    return (
        <label htmlFor={params.label} className="flex flex-col w-1/2 p-5">
            {useAzure ? labels[params.label].azure : labels[params.label].aws}
            <input id={params.label} type="text" className="p-1 rounded text-black" value={data[params.label]}
                   placeholder={useAzure ? labels[params.label].azure : labels[params.label].aws} onChange={handleChange}/>
            {params.children}
        </label>
    );
};

export default InputWithLabel;
