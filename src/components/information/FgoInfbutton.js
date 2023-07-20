import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

import classes from "./fgoinf-button.module.css";
const FgoInfButton = ({ id, price, title, img, number }) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const minusHandler = () => {
    if (quantity === 0) {
      return;
    }
    setQuantity(quantity - 1);
  };
  const plusHandler = () => {
    if (quantity === 5) {
      return;
    }
    setQuantity(quantity + 1);
  };
  const onAdd = (e) => {
    e.preventDefault();

    dispatch(
      cartActions.onAdd({
        id,
        price,
        title,
        img,
        number,
        quantity,
      })
    );
  };
  return (
    <div className={classes["fgo-InF-content-second"]}>
      <div className={classes["fgo-InF-content-quantity"]}>數量:</div>
      <span className={classes["fgo-InF-content-minus"]} onClick={minusHandler}>
        -
      </span>
      <span className={classes["fgo-InF-content-num"]}>{quantity}</span>
      <span className={classes["fgo-InF-content-plus"]} onClick={plusHandler}>
        +
      </span>
      <button className={classes["fgo-InF-content-button"]} onClick={onAdd}>
        加入購物車
      </button>
    </div>
  );
};

export default FgoInfButton;
