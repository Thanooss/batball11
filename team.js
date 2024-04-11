 import { useContext } from "react"; 
 import { Context } from "./previewpage";
 import "./style.css"
 
 export default function Team(){
  const team= useContext(Context);
  console.log("context hook"+team)


  const wk=team.filter((item)=> 
item.role==="WK"
)  
const bat=team.filter((item)=> 
item.role==="BAT"
)  
const allrounders=team.filter((item)=> 
item.role==="AR"
)  
const bowl=team.filter((item)=> 
item.role==="BOWL"
)  
   

  return(<>
  <div className="outer-div">
  <div className='card'>
  {wk.map((item)=>{
   
   return(
            <img src={item.src} alt={item.src}/>)
  }) }
  </div>
  <div className='card'>
  {bat.map((item)=>{
    return(
             <img src={item.src} alt={item.src}/>)
   })}
   </div>
   <div className='card'>
   {allrounders.map((item)=>{
    return(
             <img src={item.src} alt={item.src}/>)
   })}</div>
   <div className='card-row'>
   {bowl.map((item)=>{
    return(
      
             <img src={item.src} alt={item.src}/>)
   })

  }
  </div>

</div>


  </>)

}