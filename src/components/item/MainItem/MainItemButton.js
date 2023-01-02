import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import classes from "./mainbutton.module.css";

const MainItemButton = (props) => {
  const dispatch = useDispatch();

  const { id, price, title, img, number } = props;

  const addToCartHandler = (e) => {
    e.stopPropagation();
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
        img,
        number,
      })
    );
  };

  return (
    <button className={classes.mainbutton} onClick={addToCartHandler}>
      <FontAwesomeIcon icon={faCartPlus} />
    </button>
  );
};

export default MainItemButton;
