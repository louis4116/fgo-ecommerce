import React,{useEffect,useState} from 'react';
import {useNavigate,NavLink,Outlet } from 'react-router-dom';
import { skipToken} from '@reduxjs/toolkit/dist/query';
import { useFetchUserDataQuery } from '../../api/DataSlice';
import useAccountAuth from '../../custom-hook/useAccountState';
import classes from "./personalpage.module.css"


const Personalpage = () => {
  const [profilePhoto,setProfilePhoto]=useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png")
  const [profileName,setProfileName]=useState("")
  const navigate=useNavigate();
  const {currentUser}=useAccountAuth();
  const uid=currentUser?.uid;
  const photo=currentUser?.photoURL;
  const name=currentUser?.displayName;
  const {data,error,isLoading}=useFetchUserDataQuery(uid?uid:skipToken);
 
  useEffect(()=>{
    if(photo){
      setProfilePhoto(photo)
    }
    if(name){
      setProfileName(name)
    }
  },[currentUser])

  useEffect(()=>{
    if(!currentUser){
      navigate("/*")
    }
   
  },[currentUser])
 
  
  return (
    <div className={classes.container}>
      <div className={classes.navbar}>
      <div className={classes.profile}>
            <img src={profilePhoto} key={profilePhoto} className={classes.photo}/>
            <h3>{profileName}</h3>
        </div>
      <div className={classes.navlink}>
        <NavLink className={({isActive})=>(isActive?"active":"inactive")} to="/personal">帳戶資訊</NavLink>
        <NavLink className={({isActive})=>(isActive?"active":"inactive")} to="/personal/order">訂單</NavLink>
      </div>
      </div>

      <div className={classes.outlet}>
        <Outlet context={{currentUser:currentUser,data:data,profilePhoto:[setProfilePhoto],profileName:[setProfileName]}}/>
      </div>
    </div>
  )
}

export default Personalpage