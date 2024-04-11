import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import Matches from "./batball.js";
import Contests from "./Contests";
import UserProfile from "./UserProfile.js";

export default function User() {
    const location = useLocation();
    const parameters = new URLSearchParams(location.search);
    const user_id = parameters.get("user_id");
    console.log("user_id is " + user_id)
    const [user, setUser] = useState({ user_id:0,username: '', mobile: '', email: '', balance: '', fullname: '' });
//    let  mycontext=createContext();
//    let myvalue={user_id:user.user_id,user_name:user.username}
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [teamPlayers, setTeamPlayers] = useState([]);
    const [showuserdetails, setshowuserdetails] = useState(false);
    const [showMatches, setShowMatches] = useState(true);

    useEffect(() => {
        const fetchdetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/user/${user_id}`)
                setUser(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("exception error:" + error)
            }
        }
        fetchdetails();
    }, [user_id])

    const handleMatchSelection = (match) => {
        setSelectedMatch(match);
    }

    const handleTeamCreation = (selectedTeam) => {
        setTeamPlayers(selectedTeam);
        setShowMatches(false); // Hide matches component
    }

    const handleNext = () => {
        setShowMatches(true); // Show matches component
        // Perform any other actions you need
    }

    return (
        <div className="container p-0 border border-primary ">
            {showuserdetails && (
                <div className="user-info">
                    {user && (
                        <>
                            <UserProfile user={user} />
                        </>
                    )}
                </div>
            )}

            <p>welcome to batball11 {user.username} </p>
            <div className="menu-icon" onClick={() => setshowuserdetails(!showuserdetails)}>
                <i className="fa fa-bars"></i> {/* You can use your own menu icon here */}
            </div>

            {showMatches && (
                <Matches
                    onSelectMatch={handleMatchSelection}
                    onNext={handleNext}
                />
            )}

            {!showMatches && (
                <Contests
                    user={user}
                    
                />
            )}

            {/* Render button to show contests component */}
            {!showMatches && selectedMatch && (
                <button className="btn btn-primary" onClick={handleNext}>Next</button>
            )}
        </div>
    )
}
