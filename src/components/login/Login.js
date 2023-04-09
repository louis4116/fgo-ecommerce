import React from 'react'
import { useForm,FormProvider } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../util/FormSchema';
import { useLoginSliceMutation } from '../../api/AuthSlice';
import LoginFormInput from '../ui/loginform/LoginFormInput';
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
  const submitHandler=(loginData)=>{
      loginSlice(loginData).then(()=>navigate("/")).catch((e)=>console.log(e))
  }


  return (
   <FormProvider {...method}>
    <form className={classes.login} onSubmit={method.handleSubmit(submitHandler)}> 
    {LoginFormFileds.map((item)=>(<LoginFormInput 
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