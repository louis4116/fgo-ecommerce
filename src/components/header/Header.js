import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderButton from "./HeaderButton";
import classes from "./header.module.css";

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isChekoutPage = location.pathname === "/checkout";
  return (
    <React.Fragment>
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
        {!isChekoutPage && <HeaderButton onShow={props.onShow} />}
      </header>
    </React.Fragment>
  );
};

export default Header;
