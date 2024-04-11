

import { useState } from "react"
import Preview from "./previewpage"
import "./showleaguestyle.css"
export default function Showleague({props}){
 let index=0;
const contestdetails=props;
console.log(contestdetails[0].team[0].name)

let[UserTeamPoints,updatepoints]=useState(contestdetails[0].calculatepoints())
const[buttonState,setButtonState]=useState(false);

    
   return(
   <div className="container">
  <ul>

  {props.map((item)=>{
    if(Object.keys(item).length==0){
      return null;
    }
    return(<li key={index++} onClick={()=>{
      
      setButtonState(!buttonState);
      console.log("sucessfull");
      console.log(contestdetails[0].calculatepoints())
      updatepoints(()=>{
        contestdetails[0].calculatepoints();
      })
      console.log(contestdetails[0].totalpoints)

    
    }} className="spots-list"><img  className="pic" src={item.profile}/><p>{item.name}</p><b>points: {UserTeamPoints}</b></li>)
  })}</ul>
  {buttonState&&<Preview props={contestdetails[0].team}></Preview>}

</div>)
}