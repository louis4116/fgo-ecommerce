import React from "react";
import HomeImg from "../../components/homeimg/HomeImg";
import classes from "./home.module.css";
const Home = () => {
  return (
    <div className={classes.home}>
      <HomeImg />
      <div className={classes["ItemList-first"]}></div>
    </div>
  );
};

export default Home;
