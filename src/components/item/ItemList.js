import React, { useState, useEffect, useCallback } from "react";
import { useFetchDataQuery } from "../../api/FgoSlice";
import MainItem from "./MainItem/MainItem";
import ItemImg from "./ItemImg";
import classes from "./ItemList.module.css";

const ItemList = () => {
  const [firebaseData, setFirebaseData] = useState([data]);
  const [anotherFirebaseData, setAnotherFirebaseData] = useState([]);
  const [query,setQuery]=useState("");
  const {data,error,isLoading}=useFetchDataQuery();

  // const getFgo = useCallback(async () => {
  //   const loadData = await fetch(process.env.REACT_APP_API_KEY);
  //   const getFgoData = await loadData.json();
  //   const fgo = [];
  //   for (const key in getFgoData) {
  //     fgo.push({
  //       id: key,
  //       title: getFgoData[key].title,
  //       price: getFgoData[key].price,
  //       img: getFgoData[key].img,
  //       img2: getFgoData[key].img2,
  //       gender: getFgoData[key].gender,
  //       number: getFgoData[key].number,
  //       manufacturer: getFgoData[key].manufacturer,
  //       scale: getFgoData[key].scale,
  //       size: getFgoData[key].size,
  //       des: getFgoData[key].des,
  //     });
  //   }
  //   setFirebaseData(fgo);
  //   setAnotherFirebaseData(fgo);
  // }, []);
  // useEffect(() => {
  //   getFgo();
  // }, [getFgo]);

  

  const fgoData = firebaseData.map((item) => (
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
  ));

  const filter = (e) => {
    const value =e.target.value; //淺複製
    // if (category === "0") {
    //   const result = firebaseData.filter((item) => item.id !==e);
    //   setFirebaseData(result);
    // } else if (category === "male" || category === "female") {
    //   const result = firebaseData.filter((item) => item.gender === e);
    //   setFirebaseData(result);
    // }
    // if (index === "1") {
    //   setChange1(true);
    //   setChange2(false);
    //   setChange3(false);
    // } else if (index === "2") {
    //   setChange1(false);
    //   setChange2(true);
    //   setChange3(false);
    // } else if (index === "3") {
    //   setChange1(false);
    //   setChange2(false);
    //   setChange3(true);
    // }
    // if (value === "All") {
    //   const result = firebaseData.filter((item) => item.id !==query);
     
    // } else if (value === "male" || value === "female") {
    //   const result = firebaseData.filter((item) => item.gender === query);
 
    // }
   
  };

  // useEffect(()=>{
  //   if (query === "All") {
  //       const result = firebaseData.filter((item) => item.id !==query);
  //      return result
  //     } else if (query === "male" || query === "female") {
  //       const result = firebaseData.filter((item) => item.gender === query);
  //       return result
  //     }
  // },[filter])


  return (
    <div className={classes.ItemList}>
      <ItemImg />
      <div className={classes["ItemList-first"]}>
        <div className={classes["ItemList-fixed"]}>
          <div className={classes["ItemList-category"]}>
            <button
              className={ classes["ItemList-category-button1"] }
              value="All"
              onClick={filter}
            >
              全部
            </button>
            <button
              className={classes["ItemList-category-button2"]}
              value="male"
              onClick={filter}
            >
              男
            </button>
            <button
              className={ classes["ItemList-category-button3"]}
              value="female"
              onClick={filter}
            >
              女
            </button>
          </div>
        </div>
        <div className={classes.card}>{fgoData}</div>
      </div>
    </div>
  );
};

export default ItemList;
