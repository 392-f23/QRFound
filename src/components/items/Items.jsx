import { listAll } from "firebase/storage";
import React from "react";
import { useState } from "react";
import Item from "../item/Item.jsx";

const Items = ({items}) => {
    const listOfItems = items[0]
    console.log(listOfItems)
    return (
        <div className='items'>

        {Object.entries(items).map(item => (
            <Item key={item} item={item} />
          ))}
        </div>
    )
}


export default Items;