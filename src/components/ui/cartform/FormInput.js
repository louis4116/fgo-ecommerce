import React from 'react';
import { useFormContext } from 'react-hook-form';
import classes from './forminput.module.css';
const FormInput = ({label,input}) => {
  const {register ,formState: { errors }}=useFormContext();
 //結帳表單UI
  return (
      
        <div className={classes.cartForm}>
            <label htmlFor={label}>{input.name}:</label>
            <input
              {...input}
              {...register(label)}
            />
            {errors[label]?(
              <div className={classes.message}>
                <p>{errors[label].message}</p>
              </div>
            ):""}
          </div>
      
  )
}

export default FormInput