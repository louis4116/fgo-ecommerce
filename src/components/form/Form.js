import React, { useRef } from "react";
import { useForm,FormProvider } from "react-hook-form";
import { useTwZipCode, cities, districts } from "use-tw-zipcode";
import { useSelector, useDispatch } from "react-redux";
import { useSetDataMutation} from "../../api/DataSlice";
import { cartActions } from "../../store/cart-slice";
import { useNavigate } from "react-router-dom";
import useAccountAuth from "../../custom-hook/useAccountState";
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from "../schema/FormSchema";
import ZipCode from "../zipcode/ZipCode";
import FormInput from "../ui/cartform/FormInput";
import Swal from "sweetalert2";
import Summary from "./Summary";
import classes from "./form.module.css";

const Form = () => {
  const { city, district, zipCode, handleCityChange, handleDistrictChange } = useTwZipCode();
  const [setData]=useSetDataMutation();
  const {currentUser} =useAccountAuth();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const memoRef = useRef();
  const cartItems = useSelector((state) => state.cart.itemS);
  const totalAmount = useSelector((state) => state.cart.totalNumber);
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
  const id=currentUser.uid;
  const submitHandler = async (value) => {
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
      .catch((err) => alert(err));
      
  };


  const onStop = (e) => {
    let code = e.keyCode || e.which;
    if (code === 13) {
      e.preventDefault();
      return false;
    }
  };

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
        <div className={classes["form-container-address-form-name"]}>
           <FormInput 
          label="firstName"
          input={{id:"firstName",type:"text",name:"姓氏"}}/>
          <FormInput 
          label="secondName"
          input={{id:"secondName",type:"text",name:"名字"}}/>
        </div>
        <div className={classes["form-container-address-form-contact"]}>
          <FormInput 
          label="phoneNumber"
          input={{id:"phoneNumber",type:"tel",name:"手機號碼"}}/>
            <FormInput 
          label="email"
          input={{ id:"email",type:"email",name:"信箱"}}/>
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
      <Summary />
    </form>
    </FormProvider>
  );
};

export default Form;
