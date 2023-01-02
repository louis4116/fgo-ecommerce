import React, { Fragment, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import FgoInformation from "../components/information/FgoInformation";
import Bottom from "../components/bottom/footer-content";

const ProductDetail = () => {
  const params = useParams();
  const [firebaseData, setFirebaseData] = useState([]);

  const getFgo = useCallback(async () => {
    const loadData = await fetch(process.env.REACT_APP_API_KEY);
    const getFgoData = await loadData.json();

    const fgo = [];

    for (const key in getFgoData) {
      if (key === params.id) {
        fgo.push({
          id: key,
          title: getFgoData[key].title,
          price: getFgoData[key].price,
          img: getFgoData[key].img,
          img2: getFgoData[key].img2,
          img3: getFgoData[key].img3,
          gender: getFgoData[key].gender,
          number: getFgoData[key].number,
          manufacturer: getFgoData[key].manufacturer,
          scale: getFgoData[key].scale,
          size: getFgoData[key].size,
          des: getFgoData[key].des,
        });
      }
    }

    setFirebaseData(fgo);
  }, [params.id]);
  useEffect(() => {
    getFgo();
  }, [getFgo]);
  const fgoData = firebaseData.map((item) => (
    <FgoInformation
      key={item.id}
      id={item.id}
      title={item.title}
      price={item.price}
      img={item.img}
      img2={item.img2}
      img3={item.img3}
      number={item.number}
      description={item.description}
      manufacturer={item.manufacturer}
      scale={item.scale}
      size={item.size}
      des={item.des}
    />
  ));
  return (
    <Fragment>
      {fgoData}
      <Bottom />
    </Fragment>
  );
};

export default ProductDetail;
