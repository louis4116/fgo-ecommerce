import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";
import Cartinside from "./Cart-inside";

import classes from "./cart.module.css";
const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.itemS);
  const navigate = useNavigate();
  const allTotalAmount = cartItems.reduce((pre, cur) => pre + cur.allPrice, 0);
  const check = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      return;
    } else {
      navigate("/checkout");
      props.onHide();
    }
  };
  return (
    <Modal onHide={props.onHide}>
      <ul className={classes.cart}>
        {cartItems.map((item) => (
          <Cartinside
            key={item.id}
            item={{
              id: item.id,
              name: item.name,
              allPrice: item.allPrice,
              price: item.price,
              number: item.number,
              img: item.img,
            }}
          />
        ))}
      </ul>

      <h2 className={classes["cart-allprice"]}>總金額</h2>
      <h2 className={classes["cart-allprice"]}>${allTotalAmount}</h2>
      <div className={classes["cart-second"]}>
        <button className={classes["cart-second-1"]} onClick={props.onHide}>
          關閉
        </button>
        <button className={classes["cart-second-2"]} onClick={check}>
          下單
        </button>
      </div>
    </Modal>
  );
};

export default Cart;
