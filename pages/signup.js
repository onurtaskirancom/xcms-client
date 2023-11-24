import { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Checkbox, Col, Row } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";
import Footer from "../components/pages/Footer";
import ScrollUpButton from "react-scroll-up-button";

function Signup() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // hook
  const router = useRouter();
  // console.log(router);
  // state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth?.token) {
      router.push("/");
    }
  }, [auth]);

  const onFinish = async (values) => {
    // console.log("values => ", values);
    setLoading(true);
    try {
      const { data } = await axios.post(`/signup`, values);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // console.log("signup response => ", data);
        // save in context
        setAuth(data);
        // save in local storage
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Successfully signed up");
        setLoading(false);
        // redirect
        router.push("/admin");
      }
    } catch (err) {
      toast.error("Signup failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Onur Taskiran Blog Signup</title>

        <meta description="Onur Taskiran Blog Signup form" />
      </Head>
      <Row>
        <Col span={8} offset={8} className="neo-signup">
          <h1 style={{ paddingTop: '100px' }}>Signup</h1>

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            {/* name */}
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input
                style={{ minWidth: '300px' }}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
                size="large"
              />
            </Form.Item>
            {/* email */}
            <Form.Item name="email" rules={[{ type: 'email' }]}>
              <Input
                style={{ minWidth: '300px' }}
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>
            {/* password */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input.Password
                style={{ minWidth: '300px' }}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                Register
              </Button>
              <br />
              <br />
              Already have an account?&nbsp;
              <Link href="/signin">
                <a>
                  <strong>Sign in</strong>
                </a>
              </Link>
              <img
                src={'/images/onurtaskiran-logo.png'}
                className="onur"
                alt={'onur-taskiran'}
                height={290}
                width={300}
                style={{
                  borderRadius: '20%',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: '30px',
                }}
              />
            </Form.Item>
          </Form>
          <ScrollUpButton />
        </Col>
      </Row>
      <Footer />
    </>
  );
}

export default Signup;
