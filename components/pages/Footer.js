import ParallaxImage from "./ParallaxImage";
import { Row, Col, Divider } from "antd";
import {
  UsergroupAddOutlined,
  ApiOutlined,
  CopyrightOutlined,
} from "@ant-design/icons";

import { GithubOutlined } from "@ant-design/icons";
import { LinkedinOutlined } from "@ant-design/icons";
import { TwitterOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { InstagramOutlined } from "@ant-design/icons";
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => (
  <div className="footerx">
    <Row>
      <Col span={8} style={{ textAlign: 'center', fontSize: '15px' }}>
        <br />
        onurtaskiran.com Copyright {new Date().getFullYear()} &copy; All rights
        reserved
      </Col>

      <Col span={8} style={{ textAlign: 'center' }}>
        <br />
        <img
          src={'/images/logo.png'}
          className="onur"
          alt={'onur-taskiran'}
          height={60}
          width={60}
          style={{
            borderRadius: '20%',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
      </Col>

      <Col span={8} style={{ textAlign: 'center' }}>
        <br />
        <div style={{ fontSize: '25px' }}>
          <a href="https://github.com/onurtaskirancom" target="_blank">
            <GithubOutlined />
          </a>
          &nbsp;
          <a href="https://tr.linkedin.com/in/onurtaskirancom" target="_blank">
            <LinkedinOutlined />
          </a>
          &nbsp;
          <a href="https://twitter.com/onurtskrncom" target="_blank" style={{}}>
            <FaXTwitter
              style={{ verticalAlign: 'middle', marginTop: '-7px' }}
            />
          </a>
          &nbsp;
          <a href="https://instagram.com/onurtskrncom" target="_blank">
            <InstagramOutlined />
          </a>
          &nbsp;
          <a href="mailto:onurtaskirancom@gmail.com" target="_blank">
            <MailOutlined />
          </a>
        </div>
      </Col>
    </Row>
    <br />
  </div>
);
export default Footer;
