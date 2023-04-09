import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import classes from "./summaryitem.module.css";

const SummaryItem = ({ name, price, id, number, img }) => {
 
  const dispatch = useDispatch();
  const allDelete = () => {
    dispatch(cartActions.removeAllItem(id));
  };
  return (
    <>
      <ul className={classes["summary-item"]}>
        <img className={classes["summary-item-img"]} src={img} alt="商品圖片" />

        <div className={classes["summary-item-first"]}>
          <div>
          <h3>{name}</h3>
          </div>
          <div className={classes["summary-item-price"]}>
            <span className={classes["summary-item-price-second"]}>
              ${price}
            </span>
          </div>
          <div className={classes["summary-item-number"]}>
            <span className={classes["summary-item-number-second"]}>
              數量:{number}
            </span>
          </div>
        </div>
        <div className={classes["summary-item-button"]}>
          <button onClick={allDelete}>刪除</button>
        </div>
      </ul>
    </>
  );
};

export default SummaryItem;
