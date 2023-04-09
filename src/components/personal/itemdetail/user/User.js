import React from 'react';
import classes from "./user.module.css";
const User = ({firstName,secondName,city,district,email,phoneNumber,street,zipCode,totalPrice}) => {
  return (
    <div className={classes["consignee-container"]}>
      <div className={classes["consignee-detail"]}>
        <h3>收件者資料</h3>
        <div>名字:{firstName}{secondName}</div>
        <div>地址:{city}{district}{street}</div>
        <div>信箱:{email}</div>
        <div>聯絡電話:{phoneNumber}</div>
      </div>
      <div className={classes["consignee-price"]}>
        <h3>訂單金額</h3>
        <div>${totalPrice}</div>
      </div>
    </div>
  )
}

export default User