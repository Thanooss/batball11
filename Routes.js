import { BrowserRouter,Route,Routes,Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
export default function Routing(){
    return(<>
    <BrowserRouter>
    <div>
        <Link to="/About"><button className="btn btn-outline-primary ">About</button></Link>
       
    </div>
    <Routes>
        <switch>
    <Route path="/About" element={<About/>}>
        <Route exact path="/" element={<Home/>}></Route>
        
        <Route path="Contact/:name" element={<Contact/>}></Route>
        </Route>
        </switch>
    </Routes>
    </BrowserRouter>
    </>)
}