import React from "react";
import { useState } from "react";
import { useDbData } from "../../utilities/firebase.js";

const listOfItems = [
    [10,20],
    [20,10],
    [30,30]
]


const Items = () => {
    const [data, loading, error] = useDbData("/Items");
    console.log(data)
    return (
        <p>Hello!</p>
    )
}


export default Items;