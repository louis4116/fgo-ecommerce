import React from "react";
import FgoInfButton from "./FgoInfbutton";
import FgoImg from "./FgoImg";
import classes from "./FgoInformation.module.css";

const FgoInformation = ({img,img2,img3,manufacturer,scale,size,des,id,price,title,number}) => {
  
  return (
    <div className={classes["fgo-InF"]}>
      <FgoImg img2={img2} img3={img3} />
      <div className={classes["fgo-InF-container"]}>
        <div className={classes["fgo-InF-content"]}>
          <h2>{title}</h2>
          <p>製造商:{manufacturer}</p>
          <p>比例:{scale}</p>
          <p>規格:{size}</p>
          <p>商品描述:</p>
          <p
            className={classes["fgo-InF-content-des"]}
            dangerouslySetInnerHTML={{ __html: des }}
          ></p>
        </div>

        <FgoInfButton
          id={id}
          price={price}
          title={title}
          img={img}
          number={number}
        />
      </div>
    </div>
  );
};

export default FgoInformation;
