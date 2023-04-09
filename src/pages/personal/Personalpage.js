import React,{useEffect,useState} from 'react';
import {useNavigate,NavLink,Outlet } from 'react-router-dom';
import { useFetchUserDataQuery } from '../../api/DataSlice';
import useAccountAuth from '../../custom-hook/useAccountState';
import Loading from '../../components/ui/loading/Loading';
import classes from "./personalpage.module.css"


const Personalpage = () => {
  const [profilePhoto,setProfilePhoto]=useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png")
  const [profileName,setProfileName]=useState("")
  const [itemData,setItemData]=useState([]);
  const navigate=useNavigate();
  const {currentUser}=useAccountAuth();
  const uid=currentUser?.uid;
  const photo=currentUser?.photoURL;
  const name=currentUser?.displayName;
  const {data}=useFetchUserDataQuery(uid,{skip:!uid});
 console.log(data)
  //修改暱稱和圖片，並及時放進state讓畫面更新
  useEffect(()=>{
    if(photo){
      setProfilePhoto(photo)
    }
    if(name){
      setProfileName(name)
    }
     if(!currentUser){
      navigate("/*")
    }
  },[currentUser])

  //資料放進state
  useEffect(()=>{
      
    if(data!==undefined){
      setItemData(data)
    }
    
  },[data])

  if(!data){
    return <div className={classes["personalpage-loading"]}><Loading /></div>
  }
  return (
    <div className={classes.container}>
      <div className={classes.navbar}>
      <div className={classes.profile}>
            <img src={profilePhoto} key={profilePhoto} className={classes.photo}/>
            <h3>{profileName}</h3>
        </div>
      <div className={classes.navlink}>
        <NavLink className={({isActive})=>(isActive?(classes["link-active"]):(classes["link-inactive"]))} end to="/personal">帳戶資訊</NavLink>
        <NavLink className={({isActive})=>(isActive?(classes["link-active"]):(classes["link-inactive"]))} to="/personal/order">訂單</NavLink>
      </div>
      </div>

      <div className={classes.outlet}>
        <div className={classes["outlet-container"]}>
        <Outlet context={{currentUser:currentUser,uid:uid,data:itemData,profilePhoto:[setProfilePhoto],profileName:[setProfileName],itemsPerPage:5}}/>
        </div>
      </div>
    </div>
  )
}

export default Personalpage