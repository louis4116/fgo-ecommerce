import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import classes from "./summaryitem.module.css";

const SummaryItem = (props) => {
  const { name, price, id, number, img } = props.item;
  const dispatch = useDispatch();
  const allDelete = () => {
    dispatch(cartActions.removeAllItem(id));
  };
  return (
    <Fragment>
      <ul className={classes["summary-item"]}>
        <img className={classes["summary-item-img"]} src={img} alt="商品圖片" />

        <div className={classes["summary-item-first"]}>
          <h3>{name}</h3>
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
    </Fragment>
  );
};

export default SummaryItem;
