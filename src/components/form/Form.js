import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTwZipCode, cities, districts } from "use-tw-zipcode";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { useNavigate } from "react-router-dom";
import { formSchema } from "../schema/FormSchema";
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from "sweetalert2";
import Summary from "./Summary";
import classes from "./form.module.css";

const Form = () => {
  const { city, district, zipCode, handleCityChange, handleDistrictChange } =
    useTwZipCode();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({resolver:yupResolver(formSchema)});
  const [cartData, setCartData] = useState([]);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const districtRef = useRef();
  const cityRef = useRef();
  const memoRef = useRef();
  const cartItems = useSelector((state) => state.cart.itemS);
  const totalAmount = useSelector((state) => state.totalNumber);

  const submitHandler = async (value) => {
    const { FirstName, SecondName, email, phone, street } = value;
    const district = districtRef.current.value;
    const memo = memoRef.current.value;
    const city = cityRef.current.value;
    const data = {
      FirstName,
      SecondName,
      email,
      phone,
      street,
      zipCode,
      district,
      memo,
      city,
    };

    if (cartItems.length === 0) {
      Swal.fire({
        title: "錯誤!!",
        text: "請加入商品!!",
        icon: "error",
        confirmButtonText: "關閉",
      });
      return;
    }
    await fetch(process.env.REACT_APP_API_Order, {
      method: "POST",
      body: JSON.stringify({
        user: data,
        orderItems: cartData,
        totalAmount: totalAmount,
      }),
    })
      .then(() => dispatch(cartActions.clearItem()))
      .then(() => reset())
      .then(() =>
        Swal.fire({
          title: "成功!!",
          text: "感謝您的消費，關閉提示窗將會跳轉至首頁。。。",
          icon: "success",
          confirmButtonText: "關閉",
        })
      )
      .then(() => navigation("/"))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    let hhh = [];
    for (let i = 0; i < cartItems.length; i++) {
      hhh.push({
        id: cartItems[i].id,
        name: cartItems[i].name,
        number: cartItems[i].number,
        price: cartItems[i].price,
      });
    }
    setCartData(hhh);
  }, [cartItems]);

  const onStop = (e) => {
    let code = e.keyCode || e.which;
    if (code === 13) {
      e.preventDefault();
      return false;
    }
  };

  return (
    <form
      className={classes["form-container"]}
      onKeyDown={onStop}
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className={classes["form-container-address-form"]}>
        <h2 className={classes["form-container-address-form-title"]}>
          個人資料
        </h2>
        <div className={classes["form-container-address-form-name"]}>
          <div>
            <label htmlFor="FirstName">姓氏:</label>
            <input
              type="text"
              id="FirstName"
              {...register("firstName")}
            />
            {errors.FirstName && (
              <div className={classes.message}>
                <p>{errors.FirstName.message}</p>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="SecondName">名字:</label>
            <input
              type="text"
              id="SecondName"
              {...register("secondName")}
            />
            {errors.SecondName && (
              <div className={classes.message}>
                <p>{errors.SecondName.message}</p>
              </div>
            )}
          </div>
        </div>

        <div className={classes["form-container-address-form-contact"]}>
          <div>
            <label htmlFor="phone">手機號碼:</label>
            <input
              type="tel"
              id="phone"
              {...register("phoneNumber")}
            />
            {errors.phone && (
              <div className={classes.message}>
                <p>{errors.phone.message}</p>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="email">電子郵件:</label>
            <input
              type="email"
              id="email"
              {...register("email")}
            />
            {errors.email && (
              <div className={classes.message}>
                <p>{errors.email.message}</p>
              </div>
            )}
          </div>
        </div>
        <div className={classes["form-container-address-form-city"]}>
          <div className={classes["form-container-address-form-city-first"]}>
            <label htmlFor="city">縣市:</label>
            <select
              id="city"
              ref={cityRef}
              onChange={(e) => handleCityChange(e.target.value)}
              value={city}
            >
              {cities.map((city, i) => {
                return (
                  <option value={city} key={i}>
                    {city}
                  </option>
                );
              })}
            </select>
            <select
              id="district"
              ref={districtRef}
              onChange={(e) => handleDistrictChange(e.target.value)}
              value={district}
            >
              {districts[city].map((district, i) => {
                return (
                  <option value={district} key={i}>
                    {district}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={classes["form-container-address-form-city-second"]}>
            郵遞區號:
            <div className={classes["form-container-address-form-city-third"]}>
              {zipCode}
            </div>
          </div>
        </div>

        <div className={classes["form-container-address-form-street"]}>
          <label htmlFor="street">地址:</label>
          <input
            type="text"
            id="street"
            {...register("street")}
          />
          <div className={classes.message}>
            {errors.street && <p>{errors.street.message}</p>}
          </div>
        </div>
        <div className={classes["form-container-address-form-memo"]}>
          <label htmlFor="memo">備註:</label>
          <textarea id="memo" ref={memoRef}></textarea>
        </div>
      </div>
      <Summary />
    </form>
  );
};

export default Form;
