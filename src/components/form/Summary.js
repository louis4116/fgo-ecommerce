import React from "react";
import { useSelector } from "react-redux";
import SummaryItem from "./Summary-item";
import classes from "./summary.module.css";

const Summary = ({ setShow }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const allTotalAmount = cartItems?.reduce((pre, cur) => pre + cur.allPrice, 0);
  return (
    <div className={classes.summary}>
      <h3 className={classes["summary-title"]}>購物車內容</h3>

      <div className={classes["summary-content"]}>
        {cartItems.map((item) => (
          <SummaryItem
            key={item.id}
            id={item.id}
            name={item.name}
            allPrice={item.allPrice}
            price={item.price}
            number={item.number}
            img={item.img}
          />
        ))}
      </div>
      <div className={classes["summary-button"]}>
        <h3>總金額:${allTotalAmount}</h3>
        <button onClick={() => setShow()}>確認送出</button>
      </div>
    </div>
  );
};

export default Summary;
