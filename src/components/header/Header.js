import React,{useRef,useEffect} from "react";
import { Link,useNavigate, useLocation } from "react-router-dom";
import { AccountBox,PersonOutlined,LoginOutlined } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "../../api/firebase";
import { LogoutOutlined } from "@mui/icons-material";
import useShow from "../../custom-hook/useShow";
import useAccountAuth from "../../custom-hook/useAccountState";
import HeaderButton from "./HeaderButton";
import classes from "./header.module.css";

const Header = ({onShow}) => {
  const [show,setShow]=useShow(false);
  const menuRef=useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const {currentUser}=useAccountAuth();
  const isChekoutPage = location.pathname === "/checkout";
  const isLoginPage = location.pathname === "/login";
  const signOutHandler=()=>{
    signOut(auth).then(()=>navigate("/")).catch((e)=>console.log(e))
  }
  //判斷點擊個人頭像時，是否會跳出來個人資訊的連結
  useEffect(()=>{
    const handler=(e)=>{
      if(!menuRef.current.contains(e.target)){
        setShow(false);
      }
    };
    document.addEventListener("mousedown",handler);
    return ()=>{
      document.removeEventListener("mousedown",handler)
    }
  },[show])
  //未登入
  const notLoginNav=(
    <span className={classes.accountNav}>
        <ul>
          <li><LoginOutlined /></li><li><Link className={classes.active} onClick={setShow}  to="/login">登入</Link></li>
        </ul>
      </span>);
      //已登入      
    const loginNav=(
      <span className={classes.accountNav}>
       <ul>
        <li><PersonOutlined /></li><li><Link className={classes.active} onClick={setShow}  to="/personal">個人資訊</Link></li>
       </ul>
       <ul>
        <li><LogoutOutlined /></li><li><Link className={classes.active} onClick={signOutHandler}>登出</Link></li>
       </ul>
      </span>
    ) 
    const loginImg=(
      <img className={classes.loginImg}  src={currentUser?.photoURL} onClick={setShow}/>
    )
    const notLoginImg=(
      <AccountBox style={{ fontSize:"2.5rem" ,cursor:"pointer",marginRight:"10px"}}  onClick={setShow}/>
    )
  return (
    <>
      <header className={classes.header}>
        <h1>
          <img
            src={require("../../img/fgo-icon.jpg")}
            onClick={() => {
              navigate("/");
            }}
            alt="icon"
          />
          FGO商品小舖
        </h1>
        <span className={classes.navbar}>
        <span className={classes.dropDown} ref={menuRef}>
        {currentUser?loginImg:notLoginImg}
        {show&&<div className={classes.dropDownMenu}>{!currentUser&&!isChekoutPage?notLoginNav :loginNav}</div>}
        </span>
        {!isChekoutPage && !isLoginPage && <HeaderButton onShow={onShow} />}
        </span>
      </header>
    </>
  );
};

export default Header;
