import React from 'react';
import { useFormContext } from 'react-hook-form';
import classes from "./signupform.module.css"

const SignupFormInput = ({label,input}) => {
    const {register ,formState: { errors }}=useFormContext();
  return (
    <div className={classes['signup-content']}>
    <input
      className={classes['signup-content-input']}
      {...input}
      {...register(label)}
    />
    <label htmlFor={label} className={classes['signup-content-label']}>{input.placeholder}</label>
    {errors[label]?(
      <div className={classes.message}>
        <p>{errors[label].message}</p>
      </div>
    ):""}
  </div>
  )
}

export default SignupFormInput