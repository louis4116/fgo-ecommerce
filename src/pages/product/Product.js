import React from "react";
import ItemList from "../../components/item/ItemList";
import Bottom from "../../components/bottom/footer-content";
import ItemImg from "../../components/item/ItemImg";
import classes from "./product.module.css";

const Product = () => {


  return (
    <div className={classes.main}>

      <ItemImg />
      <ItemList />



    </div>
  );
};

export default Product;
