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

function PageErrorTwo() {
  return (
    <>
      <Head>
        <title>Onur Taskiran 500 Server Error</title>
      </Head>
      <Row>
        <Col
          span={18}
          offset={3}
          style={{ fontSize: '18px', textAlign: 'center' }}
        >
          <h1 style={{ paddingTop: '125px' }}>500 Error</h1>
          <p>Server Error. Let me try again</p>
        </Col>
      </Row>
      <ScrollUpButton />
      <Footer />
    </>
  );
}

export default PageErrorTwo;
