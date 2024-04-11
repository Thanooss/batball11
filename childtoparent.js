import { useState } from "react"
import Child  from "./child";

export default function Parent(){
    let[data,setData]=useState(["task1","task2" ]);
    let updateddata=(newdata)=>{
    setData([...data,newdata]);
    
    }
    return(
        <>
        <Child props={updateddata}></Child>
        <ol>
         {data.map((item)=>{
            return(
           <li>{item}</li>)
         })}
         </ol>
         </>
        
    )
    
}
