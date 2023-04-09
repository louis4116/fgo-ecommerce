import React from 'react';
import { useFormContext } from 'react-hook-form';
import classes from "./loginforminput.module.css";
const LoginFormInput = ({label,input}) => {
    const {register ,formState: { errors }}=useFormContext();
  return (
    <div className={classes['login-content']}>
    <input
      className={classes['login-content-input']}
      {...input}
      {...register(label)}
    />
    <label htmlFor={label} className={classes['login-content-label']}>{input.placeholder}</label>
    {errors[label]?(
      <div className={classes.message}>
        <p>{errors[label].message}</p>
      </div>
    ):""}
  </div>
  )
}

export default LoginFormInput