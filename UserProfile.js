import { useEffect, useState } from "react";
import React from "react";
const UserProfile = (props) => {
  const[userdetails,updateUserDetails]=useState(null);
  const {user}=props;
   useEffect(()=>{
    const updateuserinfo=()=>{
      // const newdetails={
      //   profilePicture:'../arjunreddy.jpg',
      //   username:user.user_name,
      //   fullName:user.fullname,
      //   email:user.email,
      //   balance:user.balance,
      //   mobile:user.mobile
      updateUserDetails(user);
      }
      updateuserinfo();
    }
    
   ,[user])
  
    
  
      
    
  
    return (
      
      <div className="container mt-5 style={{b}}">
        <p>User Profile</p>
        <div>
          <img style={{width:" 100px",height:'150px'}}
          
            src={'../arjunreddy.jpg'}
            alt="Profile"
          />
          <div className="card-body">
            <p className="card-text">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="card-text">
              <strong>Full Name:</strong> {user.fullname}
            </p>
            <p className="card-text">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="card-text">
              <strong>balance:</strong> {user.balance}
            </p>
            <p className="card-text">
              <strong>Mobile:</strong> {user.mobile}
            </p>
          </div>
        </div>
        <div className="ml-4">
          
         
        </div>
      </div>
    );
  };
  
  export default UserProfile;
  