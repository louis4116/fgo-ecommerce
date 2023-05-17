import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import classes from "./switchdarkmode.module.css";

const SwitchDarkMode = ({ switchTheme, darkMode }) => {
  const result =
    darkMode === "light" ? <FiSun fontSize={36} /> : <FiMoon fontSize={36} />;
  return <div className={classes["check-button"]}>{result}</div>;
};

export default SwitchDarkMode;
