import React from 'react';
import "./previewstyle.css"
import {useState} from "react"
//import ButtonState  from './Button';
import {createContext} from "react"
function handleButtonClick(){
  this.disable();
}








export let Context=createContext();





export default function Preview({props}){
  
  
  

let[ButtonClicked,updateclick]=useState(false);
const players=props
console.log(props)


const wk=players.filter((item)=> 
item.role==="WK"
)  
const bat=players.filter((item)=> 
item.role==="BAT"
)  
const allrounders=players.filter((item)=> 
item.role==="AR"
)  
const bowl=players.filter((item)=> 
item.role==="BOWL"
)  
return(<div className='outerdiv'>
  <button onClick={()=>{
    handleButtonClick();
           
  }}>❌</button>
   {/* <Context.Provider value={players}>
  <Team></Team>
      </Context.Provider> */}
   <div className='card'>
  {wk.map((item)=>{
   
   return(
    <div className='player-profile'>
              
    <img src={process.env.PUBLIC_URL + '/'+item.src} alt={item.src}/>
    <p className='card-playername'>{item.name}</p>
    </div>)
  }) }
  </div>
  <div className='card'>
  {bat.map((item)=>{
    return(  
             <div className='player-profile'>
              
             <img src={item.src} alt={item.src}/>
             <p className='card-playername'>{item.name}</p>
             </div>)
   })}
   </div>
   <div className='card'>
   {allrounders.map((item)=>{
    return(
      <div className='player-profile'>
              
             <img src={item.src} alt={item.src}/>
             <p className='card-playername'>{item.name}</p>
            </div>
           )
   })}</div>
   <div className='card'>
   {bowl.map((item)=>{
    return(
      
      <div className='player-profile'>
              
      <img src={item.src} alt={item.src}/>
      <p className='card-playername'>{item.name}</p>
      </div>)
   })

  }
  </div>

</div>
)
}



