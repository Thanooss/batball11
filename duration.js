import React from "react";
import { useState,useEffect } from "react";
import "./durationstyle.css"
export default function Duration(props){
    


    let matchtime=props.timings;
        let date=new Date();
        let time=matchtime-date;
        
        
    
    let timing=time;
    timing=timing/1000;
    console.log(timing);
    let[remainingtime,updatetime]=useState(timing);
   
    useEffect(()=>{
        let id=setTimeout(()=>{
         let [,newtime]=totimeformat(remainingtime);
         updatetime(newtime);
        },1000)
        return ()=>clearTimeout(id);
    },[remainingtime]);

    function totimeformat(timeref){
        if(timeref>(2*86400)){
            let updatedtime=timeref;
            updatedtime=updatedtime-2*86400;
    
            let hours=Math.floor(updatedtime/3600);
            if(hours<10){
                hours="0"+hours;
            }
            return [<><p className="para">2 days {hours+" "+"hours"}</p></>,--timeref]
           }
        
       else if(timeref>86400){
        let updatedtime=timeref;
        updatedtime=updatedtime-86400;

        let hours=Math.floor(updatedtime/3600);
        if(hours<10){
            hours="0"+hours;
        }
        return [<><p className="para">1 day {hours+" "+"hours"}</p></>,--timeref]
       }
       else{
        let hours=Math.floor(timeref/3600);
        if(hours<10){
            hours="0"+hours;
        }
       // console.log(hours);
        let minutes=Math.floor((timeref%3600)/60)
        if(minutes<10){
            minutes="0"+minutes;
        }
        //console.log(minutes);
        let seconds=Math.floor(((timeref%3600)%60)/1);
       // console.log(seconds);
       if(seconds<10){
        seconds="0"+seconds;
        

       }
       return [<><p className="para">{hours}:{minutes}:{seconds}</p></>,--timeref]
    }
    }

    return(<>
    {remainingtime>0?totimeformat(remainingtime)[0]:<p className="para">time up match started !</p>}
    </>)
}