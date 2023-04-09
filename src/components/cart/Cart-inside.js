import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../src/store/cart-slice";
import classes from "./cart-inside.module.css";
const Cartinside = ({ name, price, id, number, img }) => {
  const dispatch = useDispatch();
  //同個商品增加數量
  const addToCart = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        price,
      })
    );
  };
  //同個商品減少數量
  const removeToCart = () => {
    dispatch(cartActions.removeItemToCart(id));
  };
  //直接刪除該商品
  const allDelete = () => {
    dispatch(cartActions.removeAllItem(id));
  };
  return (
    <>
      <li className={classes["cart-first"]}>
        <img className={classes["cart-inside-img"]} src={img} alt="商品圖片" />
        <div className={classes["cart-item"]}>
          <h3>{name}</h3>
          <div className={classes["cart-inside-price"]}>
            <span className={classes["cart-inside-price-span"]}>${price}</span>
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
    </>
  );
};

export default Cartinside;
