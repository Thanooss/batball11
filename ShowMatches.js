
import Duration from "./duration";
import { useNavigate } from "react-router-dom";
export default function Matches(props){
    const navigate=useNavigate();
    const {match_id}=props;
    const handleClick=()=>{
        
        navigate(`/user/matches/players?match_id=${match_id}`)
    }
    return(
    <div className="frame" onClick={handleClick}>
        
       <div className="format-div">  <p className="format">{props.format}  </p></div>
       
       <div className="match-div"> <div className="logo-div"><img  alt={props.team1logo} className="teamlogo" src={process.env.PUBLIC_URL + '/'+`${props.teamA}.jpg`}></img></div><p className="match">{props.teamA}  </p>
        <span className="versus">Vs</span><p className="match">{props.teamB}</p><div className="logo-div">
            <img alt={props.teamB} className="team-logo" src={process.env.PUBLIC_URL + '/'+`${props.teamB}.jpg`}></img></div></div>
       <div className="time-div"><Duration className="time" timings={props.timings}/></div>
       <div className="venue-div"><p className="venue">{props.venue} </p></div>
   </div>
    )
}