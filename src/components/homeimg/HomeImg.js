import React from "react";
import classes from "./homeimg.module.css";
const HomeImg = () => {
  return (
    <div className={classes["homeimg-wrapper"]}>
      <img
        className={classes["homeimg-img"]}
        src={require("../../img/MiConv.com__fgo.jpg")}
        alt="icon"
      />
      <div className={classes["homeimg-des"]}>FGO商品小舖</div>
    </div>
  );
};

export default HomeImg;
