import React from "react";
import { useState } from "react";
export default function Registration(){
    const[user,setuser]=useState({fullname:"",username:"",password:"",mobile:0,email:""});
    const handleClick=(e)=>{
        const{name,value}=e.target.name
        console.log(name)
        console.log(value)
        setuser({...user,name:value})

    }
    return (<form>
        <div className="border border-primary p-3 mb-5 mt-10">
            <label>fullname:</label>
            <input type="text" name="fullname" value={user.fullname} onChange={handleClick}></input>
            <br/>
            <label>username:</label>
            <input type="text" value={user.username} ></input>
            <br/>
            <label>password</label>
            <input type="password" value={user.password}></input>
            <br/>
            <label>email</label>
            <input type="email" value={user.email}></input>
            <br/>
            <label>mobile</label>
            <input type="number" value={user.mobile} onChange={handleClick}></input>
            <br/>
            <input type="button" value="submit"></input>
        </div>
    </form>)
}
