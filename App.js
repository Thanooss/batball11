import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

//import Players from './players';
//import Contest from './contest';
import React from "react"
import Matches from "./batball.js"

import Preview from "./previewpage.js"
import Players  from './players';
//import Duration from "./duration.js"
import Team from "./team"
import Register from "./Register.js"
import Home from "./Home.js"
import User from "./User.js"
import Login from "./login.js"
import Contests from './Contests.js';
import More from "./More.js"

 export default function App (){
 
  
  
  return (
    
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
        <Route path="/" element={<Home></Home>}/>
        <Route path="/user/" element={<User/>}/>
        
        <Route path='/user/matches' element={<Matches/>}/>
        <Route path="/user/matches/players" element={<Players />}/>
        <Route path="/contests" element={<Contests />} />
        <Route path="/preview" element={<Preview/>}/>
        <Route path='/team' element={<Team></Team>}></Route>
        <Route path='/More' element={<More></More>}></Route>
        
        
      </Routes>
    </Router>
    
  );
  };


