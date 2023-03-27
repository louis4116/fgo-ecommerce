import React from 'react';
import { useOutletContext,useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Item from './Item';
import classes from "./personalitem.module.css";
const PersonalItem = () => {
  const {data} = useOutletContext();
  
  
  const ItemList=data?.map((item)=>(
    <Item key={uuidv4()} name={item.name}  user={item.user} orderItems={item.orderItems} totalAmount={item.totalAmount}/>
  ))
 

  return (
    <div className={classes["personal-item"]}>
      <h2>我的訂單</h2>
  
   {ItemList}
</div>
  )
}

export default PersonalItem