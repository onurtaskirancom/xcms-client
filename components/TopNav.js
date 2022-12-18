import { useState, useContext } from "react";
import { Menu } from "antd";
import {
  NodeExpandOutlined,
  ExpandOutlined,
  AlignCenterOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
  MehOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import ToggleTheme from "./ToggleTheme";
import Link from "next/link";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";

const { SubMenu } = Menu;

const TopNav = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [current, setCurrent] = useState("mail");
  // hooks 
  const router = useRouter();

  const handleClick = (e) => {
    //console.log("click ", e);
    setCurrent(e.key);
  };

  const signOut = () => {
    // remove from local storage
    localStorage.removeItem("auth");
    // remove from context
    setAuth({
      user: null,
      token: "",
    });
    // redirect to login
    router.push("/signin");
  };

  const roleBasedLink = () => {
    if (auth?.user?.role === "Admin") {
      return "/admin";
    } else if (auth?.user?.role === "Author") {
      return "/author";
    } else {
      return "/subscriber";
    }
  };

  
  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      theme="dark"
      style={{ zIndex: 100, width: "100%", position: "fixed", paddingLeft:"80px"}}
    >

      <Menu.Item key="home">
        <Link href="/">
          <a>
            {<ExpandOutlined style={{ marginRight: "5px" }} />}
            Home
          </a>
        </Link>
      </Menu.Item>

      <Menu.Item key="posts" icon={<AlignCenterOutlined />}>
        <Link href="/posts">
          <a>Posts</a>
        </Link>
      </Menu.Item>

      <Menu.Item key="about" icon={<MehOutlined />}>
        <Link href="/about">
          <a>About</a>
        </Link>
      </Menu.Item>

      <Menu.Item key="contact" icon={<NodeExpandOutlined />}>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </Menu.Item>

      {auth?.user === null && (
        <>
          <Menu.Item
            style={{ marginLeft: "auto" }}
            key="signup"
            icon={<UserAddOutlined />}
          >
            <Link href="/signup">
              <a>Signup</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="signin" icon={<UserOutlined />}>
            <Link href="/signin">
              <a>Signin</a>
            </Link>
          </Menu.Item>
        </>
      )}

      {auth?.user !== null && (
        <>
          <SubMenu
            key="SubMenu"
            icon={<SettingOutlined />}
            title={auth?.user?.name || "Dashboard"}
            style={{ marginLeft: "auto" }}
          >
            <Menu.ItemGroup title="Management">
              <Menu.Item key="setting:2">
                <Link href={roleBasedLink()}>
                  <a>Dashboard</a>
                </Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>

          <Menu.Item
            onClick={() => signOut()}
            key="signout"
            icon={<LogoutOutlined />}
          >
            <a>Sign out</a>
          </Menu.Item>
        </>
      )}

      <Menu.Item key="theme" style={{ backgroundColor: "#1f1f1f" }}>
        <ToggleTheme style={{ height: "75px" }} />
      </Menu.Item>
    </Menu>
  );
};

export default TopNav;
