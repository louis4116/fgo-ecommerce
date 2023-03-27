import React from "react";
import { useRoutes} from "react-router-dom";
import Header from "./components/header/Header";
import Cart from "./components/cart/Cart";
import { productRoutes} from "./util/Routes";
import useAccountAuth from "./custom-hook/useAccountState";
import useShow from "./custom-hook/useShow";
 
import "./app.css";


function App() {
  const [show, setShow] = useShow(false);
  const {currentUser}=useAccountAuth();
  const productRouting=useRoutes(productRoutes(currentUser));

  
  return (
    <div className="App">
      <Header onShow={setShow} />
      {show && <Cart onHide={setShow} />}
        {productRouting}
    </div> 
  );
}

export default App;
