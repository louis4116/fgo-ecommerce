import React,{ useCallback} from 'react'
import classes from "./category.module.css"
const CategoryButton = (props) => {
  const {label,value,query,setQuery}=props;
  const filter = useCallback(() => {
    setQuery(value) 
  },[value]);
  //分類的UI和邏輯
  return (
            <button
              className={query===value?(classes["ItemList-category-button-active"]):(classes["ItemList-category-button"])}
              onClick={filter}
            >
              {label}
            </button>         
  )
}

export default CategoryButton