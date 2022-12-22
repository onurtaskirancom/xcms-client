import { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Checkbox, Col, Row } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";
import Footer from "../components/pages/Footer";

function Signin() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [loading, setLoading] = useState(false);
  // hooks
  const router = useRouter();
  // const [form] = Form.useForm();

  useEffect(() => {
    if (auth?.token) {
      router.push("/");
    }
  }, [auth]);

  const onFinish = async (values) => {
    // console.log("values => ", values);
    try {
      setLoading(true);
      const { data } = await axios.post("/signin", values);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // console.log("signin response => ", data);
        // save user and token to context
        setAuth(data);
        // save user and token to local storage
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Successfully signed in");
        // redirect user
        if (data?.user?.role === "Admin") {
          router.push("/admin");
        } else if (data?.user?.role === "Author") {
          router.push("/author");
        } else {
          router.push("/subscriber");
        }
        // form.resetFields();
      }
    } catch (err) {
      console.log("err => ", err);
      setLoading(false);
      toast.error("Signin failed. Try again.");
    }
  };

  return (
    <>
      <Row>
        <Col span={8} offset={8}>
          <h1 style={{ paddingTop: "100px" }}>Signin</h1>

          <Form
            // form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
              email: "",
              password: "",
            }}
            onFinish={onFinish}
          >
            {/* email */}
            <Form.Item name="email" rules={[{ type: "email" }]}>
              <Input
                style={{ minWidth: "260px" }}
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>
            {/* password */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                style={{ minWidth: "260px" }}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Link href="/forgot-password">
              <a>Forgot Password</a>
            </Link>
            <br />
            <br />

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
              <br />
              <br />
              Don’t have an account yet?&nbsp;
              <Link href="/signup">
                <a>
                  <strong>Sign up</strong>
                </a>
              </Link>
              <img
                src={"/images/onurtaskiran-logo.png"}
                className="onur"
                alt={"onur-taskiran"}
                height={290}
                width={300}
                style={{
                  borderRadius: "20%",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Footer />
    </>
  );
}

export default Signin;
