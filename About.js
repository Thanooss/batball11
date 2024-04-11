import { Link, Outlet } from "react-router-dom";

export default function About(){
    return(<>
    <Link to="Contact"><button className="btn btn-primary">Contact</button></Link>
    <h1>This is about section</h1><Outlet></Outlet><h1>nested routing</h1></>)
}