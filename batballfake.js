import React from "react";
import axios from "axios"
import { useState,useEffect} from "react";
import "./batballstyle.css"
import Matches from "./Matches.js"




export default function App(){

// let fixedmatches=[{key:1,match:"CSK vs RCB",venue:"Chinnaswamy Stadium, Benguluru",logo1:"/csklogo.jpg",logo2:"/rcblogo.jpg",format:"T20",timings:new Date("September 23,2023 18:30:00")},
// {key:2,match:"Newzeland vs England",venue:"motera stadium, Gujarat",logo1:"/csklogo.jpg",logo2:"/rcblogo.jpg",format:"ODI",timings:new Date("September 24,2023 19:30:00")},
// {key:3,match:"South Africa vs Australia",venue:"Uppal Stadium Hyderabad",logo1:"/csklogo.jpg",logo2:"/rcblogo.jpg",format:"ODI",timings:new Date("September 24,2023 20:30:00")},
// {key:4,match:"India vs Pakistan",venue:"wankhade stadium, Mumbai",logo1:"/csklogo.jpg",logo2:"/rcblogo.jpg",format:"ODI",timings:new Date("September 25,2023 21:30:00")}]


    let [matches,setMatches]=useState([]);
    useEffect(()=>{
      const fetchdata=async()=>{
        try{
       const response=await axios.get('http://localhost:3001/');
       setMatches(response.data);
        }
        catch (error){
          console.error("Error while fetching matches data :",error);
        }
      };
      fetchdata();
    },[]);
  
     
    
    return(<>{matches.map((match)=>{
      console.log( match.time)
         return <Matches 
         //team1logo={match.logo1}
         //team2logo={match.logo2}
        timings={match.time}
        key={match.match_id}
        match={match.matches}
        format={match.format}
        venue={match.venue}
        
        
        
      />

    })
}</>)
}