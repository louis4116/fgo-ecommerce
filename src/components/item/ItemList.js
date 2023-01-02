import React, { useState, useEffect, useCallback } from "react";
import MainItem from "./MainItem/MainItem";
import ItemImg from "./ItemImg";
import classes from "./ItemList.module.css";
import { v4 as uuidv4 } from "uuid";
const ItemList = () => {
  const [firebaseData, setFirebaseData] = useState([]);
  const [anotherFirebaseData, setAnotherFirebaseData] = useState([]);
  const [change1, setChange1] = useState(false);
  const [change2, setChange2] = useState(false);
  const [change3, setChange3] = useState(false);

  const getFgo = useCallback(async () => {
    const loadData = await fetch(process.env.REACT_APP_API_KEY);
    const getFgoData = await loadData.json();
    const fgo = [];
    for (const key in getFgoData) {
      fgo.push({
        id: uuidv4(),
        title: getFgoData[key].title,
        price: getFgoData[key].price,
        img: getFgoData[key].img,
        img2: getFgoData[key].img2,
        gender: getFgoData[key].gender,
        number: getFgoData[key].number,
        manufacturer: getFgoData[key].manufacturer,
        scale: getFgoData[key].scale,
        size: getFgoData[key].size,
        des: getFgoData[key].des,
      });
    }
    setFirebaseData(fgo);
    setAnotherFirebaseData(fgo);
  }, []);
  useEffect(() => {
    getFgo();
  }, [getFgo]);
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

  const filter = (category, index) => {
    const data = [...anotherFirebaseData]; //淺複製

    if (category === "0") {
      const result = data.filter((item) => item.id !== category);
      setFirebaseData(result);
    } else if (category === "male" || category === "female") {
      const result = data.filter((item) => item.gender === category);
      setFirebaseData(result);
    }
    if (index === "1") {
      setChange1(false);
      setChange2(false);
      setChange3(true);
    } else if (index === "2") {
      setChange1(false);
      setChange2(true);
      setChange3(false);
    } else if (index === "3") {
      setChange1(false);
      setChange2(false);
      setChange3(true);
    }
  };

  return (
    <div className={classes.ItemList}>
      <ItemImg />
      <div className={classes["ItemList-first"]}>
        <div className={classes["ItemList-fixed"]}>
          <div className={classes["ItemList-category"]}>
            <button
              className={change1 ? classes["ItemList-category-button1"] : ""}
              onClick={() => filter("0", "1")}
            >
              全部
            </button>
            <button
              className={change2 ? classes["ItemList-category-button2"] : ""}
              onClick={() => filter("male", "2")}
            >
              男
            </button>
            <button
              className={change3 ? classes["ItemList-category-button3"] : ""}
              onClick={() => filter("female", "3")}
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
