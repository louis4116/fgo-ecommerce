import React from 'react';
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../schema/FormSchema';
import {useSignUpSliceMutation} from "../../api/AuthSlice";
import Swal from 'sweetalert2';
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
  const {register,reset,formState:{errors}}=method;
  const onSubmitHandler=(signupData)=>{
       signUpSlice(signupData).then(()=>reset()).catch((e)=>console.log(e))
  }
  return (
    
    <form  className={classes.signup} onSubmit={method.handleSubmit(onSubmitHandler)}>
    <div className={classes['signup-content']}>  
      <input type="text" id='userName' placeholder="使用者名稱" className={classes['signup-content-input']}
              {...register("userName")}/>
          <label htmlFor='userName' className={classes['signup-content-label']} >使用者名稱</label>
        {errors.userName && (
              <div className={classes.message}>
                <p>{errors.userName.message}</p>
              </div>
            )}
        
    </div>
    <div className={classes['signup-content']}>
    <input type="email" id='account-3' placeholder="帳號" className={classes['signup-content-input']}
            {...register("email")}/>
            <label htmlFor='account-3' className={classes['signup-content-label']} >帳號</label>
        {errors.email && (
            <div className={classes.message}>
              <p>{errors.email.message}</p>
            </div>
          )}
    </div>
    <div className={classes['signup-content']}>
      <input type="password" id='password-3' className={classes['signup-content-input']} placeholder="密碼" 
      {...register("password")}/>
      <label htmlFor='password-3' className={classes['signup-content-label']}>密碼</label>
      {errors.password && (
            <div className={classes.message}>
              <p>{errors.password.message}</p>
            </div>
          )}
      
    </div>
    <div className={classes['signup-content']}>
    <input
          type="password" id='confirmPassword'  className={classes['signup-content-input']} placeholder="密碼"
          {...register("confirmPassword")}/>
          <label htmlFor='confirmPassword' className={classes['signup-content-label']}>確認密碼</label>   
             {errors.confirmPassword && (
            <div className={classes.message}>
              <p>{errors.confirmPassword.message}</p>
            </div>
          )}
       
    </div>
      <button className={classes['signup-button']} ><span className={classes["signup-button-span"]}>註冊</span></button>
      <span className={classes.showButton} onClick={()=>onShow(false)}>已經有帳號了? 點擊這裡來進行登入</span>
    </form>
    
    
  )
}

export default Signup