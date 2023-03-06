import React from 'react';
import { useFormContext } from 'react-hook-form';
import classes from './forminput.module.css';
const FormInput = (props) => {
  const {label,input}=props;
  const {register ,formState: { errors }}=useFormContext();
 
  return (
    <div>
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