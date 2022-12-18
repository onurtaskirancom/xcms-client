import { useContext } from "react";
import { ThemeContext } from "../context/theme";
import Head from "next/head";
import { Avatar } from "antd";

const ToggleTheme = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <>
      <Head>
        <link rel="stylesheet" href={`/css/${theme}.css`}/>
      </Head>
      {theme === "light" ? (
        <span
          onClick={() => {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
          }}
           style={{ fontSize: "30px"}}
        >
           <img src={"/images/moon.png"}  />
        </span>
      ) : (
        <span
          onClick={() => {
            setTheme("light");
            localStorage.setItem("theme", "light");
          }}
           style={{ fontSize: "30px" }}
        > 
           <img src={"/images/sun.png"}  />
        </span>
      )}
    </>
  );
};

export default ToggleTheme;


