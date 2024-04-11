
import Duration from "./duration";
import { useNavigate } from "react-router-dom";
export default function Matches(props){

    const navigate=useNavigate();
    
    const {match_id}=props;
    const handleClick=()=>{
        console.log(match_id)
        
        navigate(`/user/matches/players?match_id=${match_id}`)
    }
    
    return(<>
      
    
        
    <div className="frame" onClick={handleClick}>
        
        
       <div className="format-div">
        <p className="format">{props.format} </p>
        </div>
       <div className="match-div"> <div className="logo-div">
        <img  alt={props.teamA} className="team-logo" src={`${props.teamA}.png`}></img>
        </div>
        <p className="match">{props.teamA}  </p>
        <span className="versus">Vs</span>
        <p className="match">{props.teamB}</p>
        <div className="logo-div">
            <img alt={props.teamB} className="team-logo"  src={`${props.teamB}.jpg`}></img>
            </div>
            </div>
       <div className="time-div"><Duration className="time" timings={props.timings}/></div>
       <div className="venue-div"><p className="venue">{props.venue} </p></div>
   </div>
   </>)
}