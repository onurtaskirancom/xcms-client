import { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Checkbox, Col, Row } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import Footer from "../components/pages/Footer";
import ScrollUpButton from "react-scroll-up-button";

function ContactForm() {
  // state
  const [loading, setLoading] = useState(false);
  // hooks
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    // console.log("values => ", values);
    setLoading(true);
    try {
      const { data } = await axios.post("/contact", values);
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        toast.success("Your message has been sent");
        form.resetFields();
        setLoading(false);
      }
    } catch (err) {
      // console.log("err => ", err);
      setLoading(false);
      toast.error("Email failed. Try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Onur Taskiran Contact</title>

        <meta description="contact form send message " />
      </Head>
      <Row>
        <Col span={8} offset={8} className="neo-contact">
          <h1 style={{ paddingTop: '100px' }}>Contact</h1>

          <Form
            form={form}
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
          >
            {/* name */}
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please enter your name' }]}
              hasFeedback
            >
              <Input
                style={{ minWidth: '300px' }}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Your name"
                size="large"
              />
            </Form.Item>
            {/* email */}
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please enter your email' }]}
              hasFeedback
            >
              <Input
                style={{ minWidth: '300px' }}
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Your email"
                size="large"
              />
            </Form.Item>
            {/* message */}
            <Form.Item
              name="message"
              rules={[{ required: true, message: 'Please enter your message' }]}
              hasFeedback
            >
              <Input.TextArea
                style={{ minWidth: '300px', height: '150px' }}
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Write your message here.."
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Submit
              </Button>
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
      <ScrollUpButton />
      <Footer />
    </>
  );
}

export default ContactForm;
