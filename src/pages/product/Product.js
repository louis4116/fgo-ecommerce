import React,{useState,useEffect} from "react";
import { useFetchDataQuery } from "../../api/DataSlice";
import { category } from "../../components/ui/category/data";
import MainItem from "../../components/item/MainItem";
import Loading from "../../components/ui/loading/Loading";
import CategoryButton from "../../components/ui/category/CategoryButton";
import HomeImg from "../../components/homeimg/HomeImg";
import classes from "./product.module.css";

const Product = () => {
  const [firebaseData, setFirebaseData] = useState([]);
  const [query,setQuery]=useState("All");
  const {data}=useFetchDataQuery();
  useEffect(()=>{
    if (query=== "All") {
        setFirebaseData(data)
      } else if (query === "male" || query === "female") {
        const result = data.filter((item) => item.gender === query );
        setFirebaseData(result)
      };  
  },[query,data])

  //打印出全部的商品
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
  //分類標籤
  const categorybutton=category?.map((item)=>(
    <CategoryButton 
      key={item.label}
      label={item.label}
      value={item.value}
      query={query}
      setQuery={setQuery}
    />
  ))
    if(!data) return <div className={classes["ItemList-loading"]}><Loading /></div>; 
  return (
    <div className={classes.main}>
      <HomeImg />
     <div className={classes["ItemList-first"]}>
        <div className={classes["ItemList-fixed"]}>
          <div className={classes["ItemList-category"]}>
            {categorybutton}
          </div>
        </div>
        <div className={classes.card}>{fgoData}</div>
      </div>
    </div>
  );
};

export default Product;
