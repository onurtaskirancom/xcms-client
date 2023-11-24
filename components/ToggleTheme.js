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
          
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link
        rel='icon'
        href='/images/favicon.ico'
        type='image/x-icon'
      />
      <link rel='icon' href='/images/favicon-16x16.png' type='image/x-icon' />
      <link rel='icon' href='/images/favicon-32x32.png' type='image/x-icon' />
      <link rel='icon' href='/images/android-chrome-192x192.png' type='image/x-icon' />
      <link rel='icon' href='/images/android-chrome-512x512.png' type='image/x-icon' />
      <link rel='icon' href='/images/apple-touch-icon.png' type='image/x-icon' />
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
           <img src={"/images/moon.png"} alt="onurtaskiran.com"  />
        </span>
      ) : (
        <span
          onClick={() => {
            setTheme("light");
            localStorage.setItem("theme", "light");
          }}
           style={{ fontSize: "30px" }}
        > 
           <img src={"/images/sun.png"} alt="onurtaskiran.com"  />
        </span>
      )}
    </>
  );
};

export default ToggleTheme;


