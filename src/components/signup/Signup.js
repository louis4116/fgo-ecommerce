import React from 'react';
import {useForm,FormProvider} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../../util/FormSchema';
import {useSignUpSliceMutation} from "../../api/AuthSlice";
// import SignupFormInput from '../ui/signupform/SignupFormInput';
import AccountInput from '../ui/accountform/AccountInput';
import Swal from 'sweetalert2';
import { SignupFormFileds } from './util';
import classes from "./signup.module.css";


const Signup = ({onShow}) => {
  const  [signUpSlice]=useSignUpSliceMutation(); 
  const method =useForm({
    mode:"onSubmit",
    resolver:yupResolver(signupSchema),
    defaultValues:{
      userName:"",
      email:"",
      password:"",
      confirmPassword:""
    }
  });
  const {reset}=method;
  const onSubmitHandler=(signupData)=>{
       signUpSlice(signupData)
       .then((e)=>{
        if(e.error){
          throw new Error()
        }})
       .then(()=>reset())
       .then(()=>onShow())
       .catch(()=>Swal.fire({
        title: "失敗!",
        text: "註冊失敗!!信箱已使用或是出現不可預期的錯誤",
        icon: "error",
        confirmButtonText: "關閉",
      }));
  };
  return (
    <FormProvider {...method}>
    <form  className={classes.signup} onSubmit={method.handleSubmit(onSubmitHandler)}>
    {SignupFormFileds.map((item)=>(<AccountInput
          key={item.label} 
          label={item.label}
          input={{id:item.id,type:item.type,placeholder:item.name}}/>))}
      <button className={classes['signup-button']} ><span className={classes["signup-button-span"]}>註冊</span></button>
      <span className={classes.showButton} onClick={()=>onShow(false)}>已經有帳號了? 點擊這裡來進行登入</span>
    </form>
    </FormProvider>
    
  )
}

export default Signup