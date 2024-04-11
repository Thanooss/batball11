import React from "react"
import { useState } from "react"
export default function Login(){
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('');
    handleSubmit=  async ()=>{
        try {
        // Send login details to the server for verification
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        // Assuming the server responds with a success message
        const data = await response.json();
  
        // If login is successful, you can redirect to the next step or perform other actions
        console.log('Login successful:', data);
      } catch (error) {
        console.error('Login failed:', error);
      }
    };
    return(<>
        <label>username</label>
        <input type="text" value={username} onChange={(e)=>{
            setUsername(e.target.value)
        }}></input>
        <br></br>
        <label>password</label>
        <input type="password" value={password} onChange={(e)=>{
         setPassword(e.target.value);
        }} ></input>
        <br></br>
        <button onClick={hadleSubmit}>submit</button>
        </>)
}