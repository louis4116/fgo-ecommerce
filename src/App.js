import React, { useState, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { productRoutes } from "./util/Routes"; //網址路徑
import Header from "./components/header/Header";
import Cart from "./components/cart/Cart";
import useAccountAuth from "./custom-hook/useAccountState";
import useShow from "./custom-hook/useShow";
import Loading from "./components/ui/loading/Loading";
import classes from "./App.css";

function App() {
  const [show, setShow] = useShow(false);
  const [darkMode, setDarkMode] = useState("light");
  const { currentUser } = useAccountAuth();
  const productRouting = useRoutes(productRoutes(currentUser));
  const switchTheme = () => {
    const newTheme = darkMode === "light" ? "dark" : "light";
    document.body.style.backgroundColor =
      darkMode === "light" ? "#121212" : "#F5F5F5";
    setDarkMode(newTheme); //深色模式
  };

  return (
    <div data-theme={darkMode}>
      <Header onShow={setShow} switchTheme={switchTheme} darkMode={darkMode} />
      {show && <Cart onHide={setShow} />}
      <Suspense
        fallback={
          <div style={{ marginTop: "14rem" }}>
            <Loading />
          </div>
        }
      >
        {productRouting}
      </Suspense>
    </div>
  );
}

export default App;
