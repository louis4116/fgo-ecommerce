import React from 'react';
import classes from "./orderitems.module.css";
const OrderItems = ({price,img,name,number}) => {
  return (
    <>
    <div className={classes["orderitems-container"]}>
        <div className={classes["orderitems-detail"]}>
          <img src={img} className={classes["orderitems-img"]}/>
            <div className={classes["orderitems-name"]}>
              <div>{name}</div>
              <div>x{number}</div>
          </div>
        </div>
      <div className={classes["orderitems-allPrice"]}>${price}</div>
    </div>
    <div className={classes["orderitems-bottom"]}></div>
    </>
  )
}

export default OrderItems