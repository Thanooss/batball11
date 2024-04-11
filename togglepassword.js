//import React, { useEffect } from "react"
import { useState } from "react"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
//import User from "./User.js"
export default function Login(){
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('');
    const[Isuservalid,setUserValidityState]=useState(false)
    const togglePasswordVisibility = () => {
      setShowPassword(prevState => !prevState);
    }
    const handleSubmit=  async ()=>{
        try {
        // Send login details to the server for verification
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        const data=await response.json();
        if(response.ok){
          
          setUserValidityState(true);
          console.log('Login successful:', data.message);
          const user_id=data.user_id;
          console.log(data.user_id);
          navigate(`/user?user_id=${user_id}`)
        }
        else{
        
          setUserValidityState(false)
          alert(data.message)
        }
  
        // Assuming the server responds with a success message
        
  
        // If login is successful, you can redirect to the next step or perform other actions
       
      } catch (error) {
        alert(error.message)
      }
      

      

    };
    // useEffect(()=>{

    
    // if(Isuservalid){
    //   navigate(`/user/${username}`)
    // }
    // else{
    //   alert('invalid credentials')
    // }},[Isuservalid])
    return(<div className="container p-5    border border-primary  ">
      
        <label className="form-label" >username</label>
        <input type="text" className="form-control border border-primary" value={username} onChange={(e)=>{
            setUsername(e.target.value)
        }}></input>
        <br/>
        <label className="form-label">password</label>
        <input type={showPassword ? "text" : "password"} className="form-control border border-primary" value={password} onChange={(e)=>{
         setPassword(e.target.value);
        }} ></input>
              <span onClick={togglePasswordVisibility}>
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </span>

        <br></br>
        <button className="btn btn-primary" onClick={handleSubmit}>submit</button>
        
        
        </div>)
}