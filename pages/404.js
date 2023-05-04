import { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Col, Row } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import axios from 'axios';
import Head from 'next/head';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Footer from '../components/pages/Footer';
import ScrollUpButton from 'react-scroll-up-button';

function PageNotFound() {

  return (
    <>
      <Head>
        <title>Onur Taskiran 404 Page Not Found</title>
      </Head>
      <Row>
        <Col
          span={18}
          offset={3}
          style={{ fontSize: '18px', textAlign: 'center' }}
        >
          <h1 style={{ paddingTop: '125px' }}>404 Page Not Found</h1>
          <p>The requested page was not found on this server. </p>
          <p>Please, make sure you have typed the current URL</p>
          <img
            style={{
              margin: 'auto',
              paddingTop: '30px',
              paddingBottom: '30px',
            }}
            className="neo-about col-md-3"
            src="https://onurtaskiran.com/images/onurtaskiran404.png"
            alt="onurtaskiran"
          />
        </Col>
      </Row>
      <ScrollUpButton />
      <Footer />
    </>
  );
}

export default PageNotFound;

