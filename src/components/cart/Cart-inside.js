import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../src/store/cart-slice";
import classes from "./cart-inside.module.css";
const Cartinside = (props) => {
  const { name, price, id, number, img } = props.item;
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        price,
      })
    );
  };
  const removeToCart = () => {
    dispatch(cartActions.removeItemToCart(id));
  };
  const allDelete = () => {
    dispatch(cartActions.removeAllItem(id));
  };
  return (
    <React.Fragment>
      <li className={classes["cart-first"]}>
        <img className={classes["cart-inside-img"]} src={img} alt="商品圖片" />
        <div className={classes["cart-item"]}>
          <h3>{name}</h3>
          <div className={classes["cart-div-1"]}>
            <span className={classes["cart-span-first"]}>${price}</span>
          </div>
          <div className={classes["cart-bottom"]}>
            <button onClick={removeToCart}>−</button>
            <span className={classes["cart-span-second"]}>x{number}</span>
            <button onClick={addToCart}>+</button>
          </div>
        </div>
        <div className={classes["delete-button"]}>
          <button onClick={allDelete}>刪除</button>
        </div>
      </li>
    </React.Fragment>
  );
};

export default Cartinside;
