import React, { useState, useEffect, useCallback } from "react";
import { useFetchDataQuery } from "../../api/DataSlice";
import { category } from "../ui/category/data";
import MainItem from "./MainItem/MainItem";
import Loading from "../ui/loading/Loading";
import CategoryButton from "../ui/category/CategoryButton";
import classes from "./ItemList.module.css";

const ItemList = () => {
  const [firebaseData, setFirebaseData] = useState([]);
  const [query,setQuery]=useState("All");
  const {data,error,isLoading}=useFetchDataQuery();

  useEffect(()=>{
   
    if (query === "All") {
        setFirebaseData(data)
      } else if (query === "male" || query === "female") {
        const result = data.filter((item) => item.gender === query);
        setFirebaseData(result)
      };
  },[query,data])


  const fgoData =firebaseData?.map((item) => (
    <MainItem
      key={item.id}
      id={item.id}
      title={item.title}
      price={item.price}
      img={item.img}
      img2={item.img2}
      number={item.number}
      manufacturer={item.manufacturer}
      scale={item.scale}
      size={item.size}
      des={item.des}
    />
  ))
   
  const categorybutton=category?.map((item)=>(
    <CategoryButton 
      key={item.label}
      label={item.label}
      value={item.value}
      setQuery={setQuery}
    />
  ))


  const result =isLoading ? <Loading /> :(<div className={classes.card}>{fgoData}</div>);

  return (
    
     
      <div className={classes["ItemList-first"]}>
        <div className={classes["ItemList-fixed"]}>
          <div className={classes["ItemList-category"]}>
            {categorybutton}
          </div>
        </div>
        {result}
      </div>
    
    
  );
};

export default ItemList;
