import React from "react";
import { useState } from "react";
import { useDbData } from "../../utilities/firebase.js";
import Item from "../item/Item.jsx";

const Items = ({items}) => {
    const [data, loading, error] = useDbData("/Items");
    console.log(data)
    return (
        <div className='items'>
        {items.map(item => (
            <Item key={item.id} item={item} />
          ))}
        </div>
    )
}


export default Items;