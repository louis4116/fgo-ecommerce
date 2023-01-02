import React from "react";
import ItemList from "../components/item/ItemList";
import Bottom from "../components/bottom/footer-content";

const Product = () => {
  return (
    <div className="main">
      <ItemList />
      <Bottom />
    </div>
  );
};

export default Product;
