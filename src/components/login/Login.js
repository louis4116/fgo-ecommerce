import React from 'react'
import { useForm,FormProvider } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../util/FormSchema';
import { useLoginSliceMutation } from '../../api/AuthSlice';
import AccountInput from '../ui/accountform/AccountInput';
import Swal from 'sweetalert2';
import { LoginFormFileds } from './util';
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
  const {handleSubmit}=method;
  const submitHandler=(loginData)=>{
      loginSlice(loginData)
      .then((e)=>{
        if(e.error){
          throw new Error(e.error.message)
        }else{
          navigate("/")
        }
      })
      .catch(()=>
      Swal.fire({
        title: "失敗!",
        text: "登入失敗!!請確認帳號或密碼是否錯誤",
        icon: "error",
        confirmButtonText: "關閉",
      }));
  };


  return (
   <FormProvider {...method}>
    <form className={classes.login} onSubmit={handleSubmit(submitHandler)}> 
    {LoginFormFileds.map((item)=>(<AccountInput
          key={item.label} 
          label={item.label}
          input={{id:item.id,type:item.type,placeholder:item.name}}/>))}
    <button className={classes['login-button']} ><span className={classes["login-button-span"]}>登入</span></button>
    <span className={classes.showButton} onClick={()=>onShow(true)}>尚未註冊? 點擊這裡!!</span>
    </form>
    </FormProvider>
 
  )
}

export default Login