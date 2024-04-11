import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import { useEffect } from "react";
import "./conteststyle.css"
export default function Contests(props){
    const{user_id,user_name}={props}
    console.log("userid: "+user_id, "username : "+user_name)
    const[contests,setContests]=useState([])
    const location=useLocation();
    const queryparams=new URLSearchParams(location.search)
    const match_id=queryparams.get('match_id')
    useEffect(()=>{
        
    const fetchContests=async()=>{
        try{
        const response= await axios.get(`http://localhost:3001/contests/${match_id}`);
        setContests(response.data)
    }
    catch(error){
         console.error('error while fetching data',error)
    } }
    if(match_id){
        fetchContests();
    }
   
    
    },[match_id])
    const handleclick=async ()=>{
        try{
            const response=await axios.get('http://localhost:3001/join_contest/')
        }
        catch(error){

        }
        
    }
    return(<>
       {
        contests.map((contest)=>{
            return(<div key={contest.contest_id} className="card border-2 bg-light mb-3">
                
                <p id="totalspots"> total spots : {contest.total_spots}</p>
                <label className="text-muted winnertakesall">{contest.contest_name}</label>
                <p className="spots-filled">filled : {contest.spots_filled}</p>
                
                <p>winnings : {contest.winning_amount}</p>
                <p>entry fee : {contest.entry_fee}</p>
                <button onClick={handleclick} className="btn btn-primary">join</button>
            </div>)
        })
       }

    </>)
}