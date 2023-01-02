import React from "react";
import classes from "./Iteimg.module.css";
const ItemImg = () => {
  return (
    <div className={classes["ItemImg-wrapper"]}>
      <img
        className={classes["ItemImg-img"]}
        src={require("../../img/MiConv.com__fgo.jpg")}
        alt="icon"
      />
      <div className={classes["ItemImg-des"]}>FGO商品小舖</div>
    </div>
  );
};

export default ItemImg;
