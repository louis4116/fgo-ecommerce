import React,{useState, useCallback} from 'react'
import classes from "./category.module.css"
const CategoryButton = (props) => {
  const {label,value,setQuery}=props;
  const filter = useCallback(() => {
    setQuery(value)
  },[value]);


  return (
            <button
              className={ classes["ItemList-category-button1"] }
              onClick={filter}
            >
              {label}
            </button>         
  )
}

export default CategoryButton