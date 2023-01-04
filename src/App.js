import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Product from "./pages/Product";
import Header from "./components/header/Header";
import Cart from "./components/cart/Cart";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import { useSelector } from "react-redux";

import "./app.css";

function App() {
  const [show, setShow] = useState(false);
  const cartItems = useSelector((state) => state.cart.itemS);

  const showHandler = () => {
    setShow(true);
  };
  const hideHandler = () => {
    setShow(false);
  };
  return (
    <div className="App">
      <Header onShow={showHandler} />
      {show && <Cart onHide={hideHandler} />}

      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route
          path="/checkout"
          element={cartItems.length === 0 ? <Navigate to="/" /> : <Checkout />}
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
