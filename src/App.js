import React,{Suspense} from "react";
import { useRoutes} from "react-router-dom";
import { productRoutes} from "./util/Routes";//網址路徑
import Header from "./components/header/Header";
import Cart from "./components/cart/Cart";
import useAccountAuth from "./custom-hook/useAccountState";
import useShow from "./custom-hook/useShow";
import Loading from "./components/ui/loading/Loading";
import classes from "./app.css";


function App() {
  const [show, setShow] = useShow(false);
  const {currentUser}=useAccountAuth();
  const productRouting=useRoutes(productRoutes(currentUser));

  return (
    <div className={classes.App}>
      <Header onShow={setShow} />
      {show && <Cart onHide={setShow} />}
      <Suspense fallback={<div style={{ marginTop:"14rem" }}><Loading /></div>}>
        {productRouting}
        </Suspense>
    </div> 
  );
}

export default App;
