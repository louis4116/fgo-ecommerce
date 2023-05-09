import React from 'react'
import { useFormContext } from 'react-hook-form';
import classes from "./accountinput.module.css";
const AccountInput = ({label,input}) => {
    const {register ,formState: { errors }}=useFormContext();
    return (
      <div className={classes['account-content']}>
      <input
        className={classes['account-content-input']}
        {...input}
        {...register(label)}
      />
      <label htmlFor={label} className={classes['account-content-label']}>{input.placeholder}</label>
      {errors[label]?(
        <div className={classes.message}>
          <p>{errors[label].message}</p>
        </div>
      ):""}
    </div>)
}

export default AccountInput