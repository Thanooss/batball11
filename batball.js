import React from "react";
import axios from "axios"
import { useState,useEffect} from "react";
import "./batballstyle.css"
import Matches from "./ShowMatches"





export default function App(){

// let fixedmatches=[{key:1,match:"CSK vs RCB",venue:"Chinnaswamy Stadium, Benguluru",logo1:"/csklogo.jpg",logo2:"/rcblogo.jpg",format:"T20",timings:new Date("September 23,2023 18:30:00")},
// {key:2,match:"Newzeland vs England",venue:"motera stadium, Gujarat",logo1:"/csklogo.jpg",logo2:"/rcblogo.jpg",format:"ODI",timings:new Date("September 24,2023 19:30:00")},
// {key:3,match:"South Africa vs Australia",venue:"Uppal Stadium Hyderabad",logo1:"/csklogo.jpg",logo2:"/rcblogo.jpg",format:"ODI",timings:new Date("September 24,2023 20:30:00")},
// {key:4,match:"India vs Pakistan",venue:"wankhade stadium, Mumbai",logo1:"/csklogo.jpg",logo2:"/rcblogo.jpg",format:"ODI",timings:new Date("September 25,2023 21:30:00")}]


    let [matches,setMatches]=useState([]);
    useEffect(()=>{
      const fetchdata=async()=>{
        try{
       const response=await axios.get('http://localhost:3001/user/matches');
       setMatches(response.data);
       
        }
        catch (error){
          console.error("Error while fetching matches data :",error);
        }
      };
      fetchdata();
    },[]);
  
     
    if(matches.length==0){
      return(<>
      <h3>No matches found</h3>
      </>)
    }
    return(<>{matches.map((match)=>{
      
      let acutaldate=new Date(match.time)
         return <Matches 
         
         team1logo={match.teamA}
         team2logo={match.teamB}
         teamA={match.teamA}
         teamB={match.teamB}
        timings={acutaldate}
        match_id={match.match_id}
        format={match.format}
        venue={match.venue}
        
        
        
      />

    })
}</>)
}