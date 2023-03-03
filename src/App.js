import React, { useState} from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Product from "./pages/Product";
import Header from "./components/header/Header";
import Cart from "./components/cart/Cart";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import useShow from "./custom-hook/useShow";
 
import "./app.css";


function App() {
  const [show, setShow] = useShow(false);
console.log(show,setShow)

  // const showHandler = () => {
  //   setShow(true);
  // };
  // const hideHandler = () => {
  //   setShow(false);
  // };



  return (
    <div className="App">
      <Header onShow={setShow} />
      {show && <Cart onHide={setShow} />}

      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route
          path="/checkout"
          element={ <Checkout />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
