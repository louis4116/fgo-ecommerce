import React, { useRef,useEffect,useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useShow from "../../custom-hook/useShow";
import useAccountAuth from "../../custom-hook/useAccountState";
import ZipCode from "../zipcode/ZipCode";
import FormInput from "../ui/cartform/FormInput";
import Swal from "sweetalert2";
import Summary from "./Summary";
import classes from "./form.module.css";
import {  useForm,
  FormProvider,
  useTwZipCode,
  cities,
  districts,
  useSetDataMutation,
  cartActions,
  yupResolver,
  formSchema,
  debounce,
  FormFileds} from "./util"

const Form = () => {
  const [show, setShow] = useShow(true);
  //台灣的郵遞區號
  const { city, district, zipCode, handleCityChange, handleDistrictChange } = useTwZipCode();
  const [setData]=useSetDataMutation();
  const {currentUser} =useAccountAuth();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const memoRef = useRef();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce((pre, cur) => pre + cur.allPrice, 0);
  const totalAmount = useSelector((state) => state.cart.totalNumber);
  //react-hook-form
  const method=useForm({
    mode:"onSubmit",
    resolver:yupResolver(formSchema),
    defaultValues:{
      firstName:"",
      secondName:"",
      phoneNumber:"",
      email:"",
      street:""
    }
  });
  const {reset}=method;
  const id=currentUser?.uid;

  const submitHandler =useCallback( 
    //使用debounce不讓資訊連續傳送到後台 
    debounce( async (value) => {
        const { firstName, secondName, email, phoneNumber, street } = value;
        const memo = memoRef.current.value;
        const data = {
          firstName,
          secondName,
          email,
          phoneNumber,
          street,
          city, 
          district, 
          zipCode,
          memo,
          totalAmount
        };
        if (cartItems.length === 0) {
          return;
        }
        await setData({
          user:data,
          orderItems:cartItems,
          totalAmount:totalAmount,
          totalPrice:totalPrice,
          id:id
        })
        .then(()=>dispatch(cartActions.clearItem()))
        .then(()=>reset())
        .then(() =>
          Swal.fire({
            title: "成功!!",
            text: "感謝您的消費，關閉提示窗將會跳轉至首頁。。。",
            icon: "success",
            confirmButtonText: "關閉",
          })
        )
        .then(() => navigation("/"))
        .catch((err) =>  Swal.fire({
          title: "錯誤!!",
          text: "關閉提示窗將會跳轉至首頁。。。",
          icon: "error",
          confirmButtonText: "關閉",
        }))
    },1500)
    , [id]);

  //防止使用者按enter會觸發到表單提交
  const onStop = (e) => {
    let code = e.keyCode || e.which;
    if (code === 13) {
      e.preventDefault();
      return false;
    }
  };
  //清除debounce
  useEffect(()=>{
    return () => {submitHandler.cancel();}
  },[submitHandler])

  return (
    <FormProvider {...method}>
    <form
      className={classes["form-container"]}
      onKeyDown={onStop}
      onSubmit={method.handleSubmit(submitHandler)}
    >
      <div className={classes["form-container-address-form"]}>
        <h2 className={classes["form-container-address-form-title"]}>
          個人資料
        </h2>
        <div className={classes["form-container-address-form-content"]}>
          {FormFileds.map((item)=>(<FormInput 
          key={item.name} 
          label={item.label}
          input={{id:item.id,type:item.type,name:item.name}}/>))}
        </div>
        <ZipCode 
          city={city} 
          district={district} 
          zipCode={zipCode} 
          cities={cities}
          districts={districts}
          handleCityChange={handleCityChange}
          handleDistrictChange={handleDistrictChange}/>
        <div className={classes["form-container-address-form-street"]}>
          <FormInput 
          label="street"
          input={{id:"street",type:"text",name:"地址"}}/>
        </div>
        <div className={classes["form-container-address-form-memo"]}>
          <label htmlFor="memo">備註:</label>
          <textarea id="memo" ref={memoRef}></textarea>
        </div>
      </div>
      <Summary show={show} setShow={setShow}/>
    </form>
    </FormProvider>
  );
};

export default Form;
