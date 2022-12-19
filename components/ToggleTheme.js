import { useContext } from "react";
import { ThemeContext } from "../context/theme";
import Head from "next/head";
import { Avatar } from "antd";

const ToggleTheme = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <>
      <Head>

      <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-TNMWFBYJN0`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-TNMWFBYJN0');
          `,
            }}
          />

        
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


