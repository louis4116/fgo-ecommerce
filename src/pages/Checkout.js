import React, {  useEffect,useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import Form from "../components/form/Form";
import Swal from "sweetalert2";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.itemS);
  const navigate=useNavigate();
 
  const swalToProduct=useCallback(()=>{Swal.fire({
          text: "請將商品加入購物車!!!",
          imageUrl:"https://i.kym-cdn.com/photos/images/original/001/277/588/063.gif",
          title:"錯誤!!",
          showConfirmButton:false,
          allowOutsideClick:false,
          timer:3000
  }).then(()=>navigate("/"))},[]);
  
  useEffect(()=>{
    if(cartItems.length===0){
      swalToProduct();  
    }
   
  },[cartItems])


  return (
    <>
        <Form/>
    </>
  );
};

export default Checkout;
