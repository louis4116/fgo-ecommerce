import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./mainitem.module.css";

const MainItem = (props) => {
  const navigate = useNavigate();

  const navigateHandler = (e) => {
    e.stopPropagation();
    navigate(`/products/${props.id}`);
  };
  
  return (
    <div className={classes.test}>
      <div className={classes.mainItem} onClick={navigateHandler}>
        <img
          className={classes["mainItem-img"]}
          src={props.img}
          alt="商品項目"
        />

        <h3>{props.title}</h3>

        <div className={classes["mainItem-content"]}>
          <div className={classes["mainItem-button"]}>${props.price}</div>
        </div>
      </div>
    </div>
  );
};

export default MainItem;
