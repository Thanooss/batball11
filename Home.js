import { useNavigate } from "react-router-dom"
import  "./Home.css"
export default function Home(){
    const navigate=useNavigate();
    const style={textalign:"center"}
    return(<>
    <div className="container home-outer-div">
    <h2 style={{style}}>Welcome to Batball11</h2>
    <button className="btn btn-primary m-5" onClick={()=>{navigate("/register")}}>register</button>
    <button className="btn btn-primary m-5" onClick={()=>{
        navigate("/login")
    }}>login</button>
    <div className=" footer" >
    
    <button className="btn btn-secondary" onClick={()=>{
        navigate("/More")
    }}>More</button>
    </div>
    </div>
    </>)
}