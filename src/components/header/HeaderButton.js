import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import classes from "./headerbutton.module.css";

const HeaderButton = ({ onShow }) => {
  const [bump, setBump] = useState(false);
  const totalNumber = useSelector((state) => state.cart.totalNumber);
  const HBclass = `${
    bump
      ? classes["header-button-number-bump"]
      : classes["header-button-number"]
  }`;
  //商品加入後，使購物車的數字會彈跳的邏輯
  useEffect(() => {
    if (!totalNumber) {
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
    <div className={classes["header-button"]} onClick={onShow}>
      <span className={classes["header-button-icon"]}>
        <FaShoppingCart fontSize={32} />
      </span>
      <span className={HBclass}>{totalNumber}</span>
    </div>
  );
};

export default HeaderButton;
