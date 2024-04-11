import { useState } from "react"
import "./conteststyle.css"
import Showleague from "./showleague";
//import Players from "./players";

  export default function Contest({props}){
    const spots=props.spots;
    const entryfee=props.entryfee;
    const updateduser={...props.user};
    const[flag,setstate]=useState(false);
    let[contest,updatecontest]=useState(new Array(spots).fill({}));
    console.log(props.user.team[0].name)
  
    
    let [filled,updatespots]=useState(0);
    const handleClick=()=>{
      if(filled>=spots){
        alert("sorry league is full")
      }
      else{
      if(updateduser.balance>=entryfee){
       
        let ok=window.confirm("Are you sure want to join the contest "+updateduser.balance+"-"+entryfee+"?")
          if(ok){
            updateduser.balance=updateduser.balance-entryfee;
       let updatedcontest=[...contest];
       updatedcontest[filled]=updateduser;
        updatecontest(updatedcontest)
        updatespots(++filled)
            alert("you have successfully joined the contest, good luck!")
          }
        
        props.user.team.forEach(element => {
          console.log(element)
        });
        console.log(props.user)
        //console.log(contest.user.team[0])
        
    
  
      }
      else {
        console.log(props.user.balance)
        alert("you dont have enough money to join the contest")
      }
    }
    }
    
return(<div className="container"><div className="contest"><div className="spots">
    <p className="size">Total Spots :{spots}</p>
    <button className="show" onClick={()=>{
       setstate(true)

    }}>open league</button>
    <p className="size">Teams joined:{filled}</p>
    </div>
    <div className="innerdiv" >
    
 <p className="join">join</p>  
  
<button onClick={handleClick}>{entryfee}</button>
</div>
</div>
{flag&&<Showleague props={contest} />}

</div>)
}