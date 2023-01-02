import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartIcon from "./Icon";
import classes from "./headerbutton.module.css";

const HeaderButton = (props) => {
  const [bump, setBump] = useState(false);
  const totalNumber = useSelector((state) => state.cart.totalNumber);
  const HBclass = `${
    bump
      ? classes["header-button-number-bump"]
      : classes["header-button-number"]
  }`;
  useEffect(() => {
    if (totalNumber.length === 0) {
      return;
    }
    setBump(true);
    const time = setTimeout(() => {
      setBump(false);
    }, 300);
    return () => {
      clearTimeout(time);
    };
  }, [totalNumber]);
  return (
    <div className={classes["header-button"]} onClick={props.onShow}>
      <span className={classes["header-button-icon"]}>
        <CartIcon />
      </span>
      <span className={HBclass}>{totalNumber}</span>
    </div>
  );
};

export default HeaderButton;
