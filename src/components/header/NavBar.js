import React from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../api/firebase';
import useAccountAuth from '../../custom-hook/useAccountState';
import  "./navbar.css"

const NavBar = () => {
  const {currentUser}=useAccountAuth();
  const navigate=useNavigate()

  const signOutHandler=(e)=>{
    signOut(auth).then(()=>navigate("/")).catch((e)=>console.log(e))
  }

  const notLoginNav=(
  <span><NavLink className={({isActive})=>(isActive?"active":"inactive")}  to="/login">登入</NavLink></span>);
  const loginNav=(
    <>
     <span><NavLink className={({isActive})=>(isActive?"active":"inactive")}  to="/personal">個人資訊</NavLink></span>
     <span onClick={signOutHandler}>登出</span>
    </>
  ) 

  return (
    <nav>
    {!currentUser?notLoginNav :loginNav }
  
    </nav>
   
  )
}

export default NavBar