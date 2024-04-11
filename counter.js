import React from "react";
import { useState } from "react";
export default function Counter(){
    let[counter,update]=useState(0);
   const handleClick=()=>{
    update(++counter)
   }
    return(<><p>{counter}</p>
    <button onClick= {handleClick}>click</button></>)
}