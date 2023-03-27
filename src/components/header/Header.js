import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderButton from "./HeaderButton";
import NavBar from "./NavBar";
import classes from "./header.module.css";

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isChekoutPage = location.pathname === "/checkout";
  const isLoginPage = location.pathname === "/login"
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
       {!isChekoutPage&&<NavBar />}
        {!isChekoutPage && !isLoginPage && <HeaderButton onShow={props.onShow} />}
      </header>
    </>
  );
};

export default Header;
