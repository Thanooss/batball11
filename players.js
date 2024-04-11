import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

//import Matches from "./Matches.js"
import "./playerstyle.css"
//import Button from "./Button"
import { useNavigate } from "react-router-dom";
import Preview from "./previewpage";
//import Contest from "./contest.js"
//import Preview from "./previewpage";
//import { click } from "@testing-library/user-event/dist/click";
const initialcredits = 100;
let initialplayers = 0;
//let user={name:"Tharun",balance:500,team:[]};


export default function Players(props) {
    const location = useLocation();
    const queryparams = new URLSearchParams(location.search)
    const match_id = queryparams.get("match_id")

    const navigate = useNavigate();

    let [ButtonClicked, updateclick] = useState(false);
    function handleButtonClick() {
        updateclick(!ButtonClicked)
    }


    let [playerCount, updateplayercount] = useState(initialplayers);
    //  const[user,updateuser]=useState({name:"BluffMaster",balance:400,team:[]});


    //  const[playercount,updatecount]=useState(initialcount);
    const [credits, updatecredits] = useState(initialcredits);
    const [player, updatelist] = useState([]);
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                console.log(match_id)
                const response = await fetch(`http://localhost:3001/user/matches/players/${match_id}`);
                const data = await response.json();
                console.log(data[0].src);
                updatelist(data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchPlayers();
    }, [match_id]);
    // const[teamA_id,teamB_id,team_id]=player
    // let players=[{name:"Ms Dhoni",credits:8,team:"CSK",src:"dhoni.jpg",role:"WK",Isselected:false,currentpoints:4},
    // {name:"faf duplesis",credits:9,team:"RCB",src:"faf.jpg",role:"BAT",BroleIsselected:false,currentpoints:4},
    // {name:"Virat Kohli",credits:9.5,team:"RCB",src:"virat.jpg",role:"BAT",Isselected:false,currentpoints:4},
    //  {name:"Glen Maxwell",credits:9.5,team:"RCB",src:"maxwell.jpg",role:"AR",Isselected:false,currentpoints:4},
    //  {name:"Ravindra Jadeja",credits:9.5,team:"CSK",src:"jadeja.jpg",role:"AR",Isselected:false,currentpoints:4},
    //  {name:"Dinesh Karthik",credits:7,team:"RCB",src:"dk.jpg",role:"WK",Isselected:false,currentpoints:4},
    //  {name:"Mohammad Siraj",credits:8.5,team:"RCB",src:"siraj.jpg",role:"BOWL",Isselected:false,currentpoints:4},
    //  {name:"Devon Conway",credits:8.5,team:"CSK",src:"conway.jpg",role:"WK",Isselected:false,currentpoints:4},
    //  {name:"W Hasaranga",credits:10,team:"RCB",src:"hasaranga.jpg",role:"AR",Isselected:false,currentpoints:4},
    //  {name:"Mooen Ali",credits:8.5,team:"CSK",src:"mooen.jpg",role:"AR",Isselected:false,currentpoints:4},
    //  {name:"M Pathirana",credits:8.5,team:"CSK",src:"pathirana.jpg",role:"BOWL",Isselected:false,currentpoints:4},
    //  {name:"Deepak Chahar",credits:8,team:"CSK",src:"deepak.jpg",role:"BOWL",Isselected:false,currentpoints:4},
    //  {name:"Shivam Dube",credits:8,team:"CSK",src:"dube.jpg",role:"AR",Isselected:false,currentpoints:4},
    //  {name:"David willey",credits:8.5,team:"RCB",src:"willey.jpg",role:"AR",Isselected:false,currentpoints:4},
    //  {name:"Ruturaj Gaikwad",credits:9,team:"CSK",src:"ruturaj.jpg",role:"BAT",Isselected:false,currentpoints:4},
    //  {name:"Kyle Jameison",credits:7.5,team:"CSK",src:"jamieson.jpg",role:"BOWL",Isselected:false,currentpoints:4},
    //  {name:"Ajinkhya Rahane",credits:9,team:"CSK",src:"rahane.jpg",role:"BAT",Isselected:false,currentpoints:4},
    //  {name:"Harshal Patel",credits:8.5,team:"RCB",src:"harshal.jpg",role:"BOWL",Isselected:false,currentpoints:4},
    //  {name:"Michael Bracewell",credits:9,team:"RCB",src:"bracewell.jpg",role:"AR",Isselected:false,currentpoints:4},
    // ]
    //   let teamcsk=player.filter((item)=>{
    //   return item.team==="CSK"
    //   })
    //   let teamrcb=player.filter((item)=>{
    //   return item.team==="RCB"
    //   })




    // console.log(player)


    const handleClick = (clickedplayer) => {
        if (clickedplayer.credits <= credits || clickedplayer.Isselected) {
            if (!clickedplayer.Isselected) {
                if (playerCount === 11) {
                    alert("cannot select more than 11 players")
                    return null;
                }
                updateplayercount(++playerCount);
                console.log(playerCount)
            }
            else {

                updateplayercount(--playerCount);
                console.log(playerCount)
            }
        }

        const updatedplayerlist = player.map((item) => {

            if (item.name === clickedplayer.name) {
                if (item.credits > credits) {
                    if (item.Isselected === true) {

                        return { ...clickedplayer, Isselected: !item.Isselected }
                    }
                    alert("credits overflow")
                    return item;
                }

                return { ...clickedplayer, Isselected: !item.Isselected }
            }

            return item;
        })

        const updatedcredits = () =>
            updatedplayerlist.reduce((totalcredits, item) => {


                if (item.Isselected) {
                    return totalcredits - item.credits
                }
                return totalcredits;

            }, initialcredits)
        console.log(updatedplayerlist)

        updatelist(updatedplayerlist)
        updatecredits(updatedcredits)
    }
    let updatedplayers = player.filter((item) => {
        return (item.Isselected ? item : null)
    });
    let player_ids = updatedplayers.map((player) => {
        return player.player_id;
    })
    return (<>
        <div className="credits">
            <p className="left">Total credits:<span className="noraml">{100}</span></p>
            <p className="counterheading">Players Selected :<span className="counter"> {playerCount}</span></p>
            <p className="right">Remaining credits:<span className="danger">{credits}</span></p>
        </div>
        <div className="players-list">
            <div className="team-class">
                <ul>

                    {player.map((item) => {
                        if (item.teamA_id === item.team_id) {
                            return (
                                <li key={item.src} alt={item.src} className={item.Isselected ? "selected" : ""} onClick={() => handleClick(item)}>

                                    <img className="profile" src={process.env.PUBLIC_URL + '/' + item.src} />
                                    <p className="name">{item.name}</p>    <p className="cr"><span className="span-credits">{item.credits}</span>cr</p> <p className="team">{item.team_name}</p><p className="role">{item.role}</p>
                                </li>


                            )


                        }

                        return null
                    })}</ul></div>
            <div className="team-class">
                <ul>

                    {player.map((item) => {
                        if (item.teamB_id === item.team_id) {
                            return (


                                <li key={item.src} className={item.Isselected ? "selected" : ""} onClick={() => handleClick(item)}>

                                    <img className="profile" src={process.env.PUBLIC_URL + '/' + item.src} />
                                    <p className="name">{item.name}</p>    <p className="cr"><span className="span-credits">{item.credits}</span>cr</p> <p className="team">{item.team_name}</p><p className="role">{item.role}</p>
                                </li>


                            )
                        }
                        return null;
                    })}</ul></div>
        </div>
        <button className="nextbtn btn btn-primary" onClick={() => {
            console.log(playerCount)
            if (playerCount === 11) {
                //user.team=updatedplayers;
                navigate(`/contests?match_id=${match_id}`)



            }
            else {

                alert("select 11 players")
            }
        }} >next</button> <button className="previewbtn btn btn-primary mt-1" onClick={() => {


            handleButtonClick()
        }}>preview</button>

        {ButtonClicked && <Preview></Preview>}

    </>)
}


