import React, {  useEffect,useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import useAccountAuth from "../../custom-hook/useAccountState";
import Form from "../../components/form/Form";
import Swal from "sweetalert2";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.itemS);
  const {currentUser}=useAccountAuth();
  const navigate=useNavigate();
 
  const swalToLogin=useCallback(()=>{Swal.fire({
    text: "請先登入!!!",
    imageUrl:"https://i.kym-cdn.com/photos/images/original/001/277/588/063.gif",
    title:"錯誤!!",
    showConfirmButton:false,
    allowOutsideClick:false,
    timer:3000
}).then(()=>navigate("/login"))},[]);

  const swalToProduct=useCallback(()=>{Swal.fire({
          text: "請將商品加入購物車!!!",
          imageUrl:"https://i.kym-cdn.com/photos/images/original/001/277/588/063.gif",
          title:"錯誤!!",
          showConfirmButton:false,
          allowOutsideClick:false,
          timer:3000
  }).then(()=>navigate("/"))},[]);
  

  useEffect(()=>{
    if(!currentUser){
      console.log("ttttttt")
      swalToLogin();
    }
    if(cartItems.length===0){
      swalToProduct();  
    }
  },[cartItems,currentUser])


  return (
    <>
        <Form/>
    </>
  );
};

export default Checkout;
