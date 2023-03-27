import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../schema/FormSchema';
import { useLoginSliceMutation } from '../../api/AuthSlice';
import classes from "./login.module.css";


const Login = ({onShow}) => {
  const [loginSlice]=useLoginSliceMutation();
  const navigate=useNavigate();
  const method=useForm({
    mode:"onSubmit",
    resolver:yupResolver(loginSchema),
    defaultValues:{
      email:"",
      password:""
    }
  });
  const {register,formState:{errors}}=method
  const submitHandler=(loginData)=>{
      loginSlice(loginData).then((e)=>navigate("/")).catch((e)=>console.log(e))
  }


  return (
   
    <form className={classes.login} onSubmit={method.handleSubmit(submitHandler)}>    
    <div className={classes['login-content']}>
    <input type="email" id='account' placeholder="帳號" className={classes['login-content-input']}
            {...register("email")}/>
            <label htmlFor='account' className={classes['login-content-label']} >帳號</label>
        {errors.email && (
            <div className={classes.message}>
              <p>{errors.email.message}</p>
            </div>
          )}
    </div>
    <div className={classes['login-content']}>
    <input type="password" id='password' placeholder="密碼" className={classes['login-content-input']}
            {...register("password")}/>
            <label htmlFor='password' className={classes['login-content-label']} >密碼</label>
        {errors.password && (
            <div className={classes.message}>
              <p>{errors.password.message}</p>
            </div>
          )}
    </div>
    <button className={classes['login-button']} ><span className={classes["login-button-span"]}>登入</span></button>
    <span className={classes.showButton} onClick={()=>onShow(true)}>尚未註冊? 點擊這裡!!</span>
    </form>
    
 
  )
}

export default Login