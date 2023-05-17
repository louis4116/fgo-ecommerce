import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAccountAuth from "../../custom-hook/useAccountState";
import Form from "../../components/form/Form";
import Swal from "sweetalert2";
import classes from "./checkout.module.css";
const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser } = useAccountAuth();
  const navigate = useNavigate();

  //導向登入頁面
  const swalToLogin = useCallback(() => {
    Swal.fire({
      text: "請先登入!!!",
      imageUrl:
        "https://i.kym-cdn.com/photos/images/original/001/277/588/063.gif",
      title: "錯誤!!",
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 3000,
    }).then(() => navigate("/login"));
  }, []);

  //導向商品首頁
  const swalToProduct = useCallback(() => {
    Swal.fire({
      text: "請將商品加入購物車!!!",
      imageUrl:
        "https://i.kym-cdn.com/photos/images/original/001/277/588/063.gif",
      title: "錯誤!!",
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 3000,
    }).then(() => navigate("/"));
  }, []);

  //判斷是否登入或是購物車有沒有商品
  useEffect(() => {
    if (!currentUser) {
      swalToLogin();
    } else if (cartItems.length === 0) {
      console.log("test");
      swalToProduct();
    }
  }, [cartItems, currentUser]);

  return (
    <div className={classes.checkoutPage}>
      <div className={classes.checkoutContainer}>
        <Form />
      </div>
    </div>
  );
};

export default Checkout;
