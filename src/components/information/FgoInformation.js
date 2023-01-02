import React from "react";
import FgoInfButton from "./FgoInfbutton";
import FgoImg from "./FgoImg";
import classes from "./FgoInformation.module.css";

const FgoInformation = (props) => {
  return (
    <div className={classes["fgo-InF"]}>
      <FgoImg img2={props.img2} img3={props.img3} />
      <div className={classes["fgo-InF-container"]}>
        <div className={classes["fgo-InF-content"]}>
          <h2>{props.title}</h2>
          <p>製造商:{props.manufacturer}</p>
          <p>比例:{props.scale}</p>
          <p>規格:{props.size}</p>
          <p>商品描述:</p>
          <p
            className={classes["fgo-InF-content-des"]}
            dangerouslySetInnerHTML={{ __html: props.des }}
          ></p>
        </div>

        <FgoInfButton
          id={props.id}
          price={props.price}
          title={props.title}
          img={props.img}
          number={props.number}
        />
      </div>
    </div>
  );
};

export default FgoInformation;
