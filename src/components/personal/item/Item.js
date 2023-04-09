import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from "./item.module.css";
const Item = ({name,orderItems,totalAmount,totalPrice}) => {
 const navigate=useNavigate();
  const navigateHanler=()=>{
    navigate(`/personal/order/${name}`)
  };
  //0是第一個項目，只顯示第一個項目
  return (
    <>
      <div className={classes["item-intro"]} > 
        <img src={orderItems[0].img} />
        
      <div className={classes["item-name"]}>
        <div>
        {orderItems[0].name}
        </div>
        <div>
        x{orderItems[0].number}
        </div>
      </div>
      <div className={classes["item-price"]}>
        ${orderItems[0].price}
      </div>
    </div>
    <div className={classes["item-bottom"]}></div>

   <div className={classes["item-all"]}>
   <div className={classes["item-allNumber"]}>
    {totalAmount}商品
   </div>
    
    <div >
      
      <div className={classes["item-all-price"]}>
      訂單金額:
      <span>${totalPrice}</span>
      </div>
    </div>
    
   </div>
  
   <div className={classes["item-all-detail"]} onClick={navigateHanler}>檢視訂單完整訊息</div>

   </>
  )
}

export default Item