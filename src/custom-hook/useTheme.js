import { useEffect, useState } from "react";

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme"));
  const newTheme = darkMode === "dark" ? "light" : "dark";
  const switchTheme = () => {
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.style.backgroundColor =
      darkMode === "dark" ? "#121212" : "#F5F5F5";
  }, [darkMode]);

  return [darkMode, switchTheme];
};

export default useTheme;
