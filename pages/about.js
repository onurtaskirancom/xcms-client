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

function About() {
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
      console.log("err => ", err);
      setLoading(false);
      toast.error("Email failed. Try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Onur Taskiran About</title>

        <meta description=" Hi my friend, I'm Onur Taşkıran. I live in Istanbul." />
      </Head>
      <Row>
        <Col span={18} offset={3} style={{ fontSize: "18px" }}>
          <h1 style={{ paddingTop: "100px" }}>About Onur Taşkıran</h1>
          <img
            style={{ float: "right" }}
            className="neo-about col-md-3"
            src="images/onur-taskiran-profile.jpg"
            width=""
            height=""
            alt="onurtaskiran"
          />
          <p>
            Hi my friend, I'm Onur Taşkıran. I live in Istanbul. I have been
            dealing with software and graphic design for many years, love to
            listen to Metallica while writing the code. I am learning new
            technologies now and I will continue to learn. I care about reason
            and science. People should also care so i think it is... Also I am a
            professional athlete. I have three licenses in kickboxing, boxing
            and Muay Thai. Sports and software are an indispensable part of my
            life definition...
          </p>
          <p>
            Follow me maybe one day i can buy you coffee but I'll probably be
            busy so I'm not buying. come on take care. Despite everything, this
            boy loves you all.
          </p>

          <p>
            <strong style={{ color: "#96d0ff" }}>My favorite songs: </strong> Metallica - One, Metallica - My
            Friend Of Misery, Metallica - Blackened, Metallica - Turn The Page,
            Limp Bizkit - Take A Look Around, Limp Bizkit - Break Stuff, Alabama
            3 - Sad Eyed Lady Of The Lowlife, The Handsome Family - Far From Any
            Road - Paradise, Stick Figure - Stick Figure, Once in a Lifetime
          </p>
          <p>
            <strong style={{ color: "#96d0ff" }}>My favorite movies: </strong> The Godfather, Papillon
            (1973), Pulp Fiction, The Hateful Eight, Sherlock Holmes (2009), The
            Lord of the Rings: The Two Towers, The Game (1997), No Country For
            Old Men, Lost Highway, Warrior, Undisputed 3, The Matrix, The Usual
            Suspects, 1408 (2007){" "}
          </p>
          <p>
            <strong style={{ color: "#96d0ff" }}>My favorite Tv Series:</strong> Vikings, Van Helsing, Mr.
            Robot, Sherlock, Spartacus, Peaky Blinders, Banshee, Narcos, Prison
            Break, House of Cards, La Case De Papel, The Mentalist
          </p>
          <blockquote>
            <p>
              <strong style={{ color: "#96d0ff" }}> My favorite quotations:</strong>
            </p>
            <p>
              {" "}
              "It is the power of the mind to be unconquerable..." - Seneca
            </p>
            <p>"I will either find a way, or make one." - Hannibal Barca </p>
            <p>
              "Give me six hours to chop down a tree and I will spend the first
              four sharpening the axe." - Abraham Lincoln{" "}
            </p>
            <p>
              "All men can see these tactics whereby I conquer, but what none
              can see is the strategy out of which victory is evolved." - Sun
              Tzu
            </p>
          </blockquote>
          <h6>SOFTWARE SKILLS</h6>
          <p>
            <img className="" src="images/react.png" alt="onurtaskiran" />
            React
            <br />
            <img className="" src="images/nodejs.png" alt="onurtaskiran" />
            NodeJS
            <br />
            <img className="" src="images/javascript.png" alt="onurtaskiran" />
            JavaScript
            <br />
            <img className="" src="images/angular.png" alt="onurtaskiran" />
            Angular
            <br />
            <img className="" src="images/aspnet.png" alt="onurtaskiran" />
            Asp.Net Core
            <br />
            <img className="" src="images/mongodb.png" alt="onurtaskiran" />
            MongoDB
            <br />
            <img className="" src="images/msserver.png" alt="onurtaskiran" />
            Microsoft SQL Server
            <br />
            <img className="" src="images/html5.png" alt="onurtaskiran" />
            HTML5
            <br />
            <img className="" src="images/css.png" alt="onurtaskiran" />
            CSS
          </p>
          <h6>GRAPHIC SKILLS </h6>
          <p>
            <img className="" src="images/photoshop.png" alt="onurtaskiran" />
            Adobe Photoshop
            <br />
            <img className="" src="images/illustrator.png" alt="onurtaskiran" />
            Adobe Illustrator
            <br />
            <img className="" src="images/indesign.png" alt="onurtaskiran" />
            Adobe InDesign
            <br />
            <img className="" src="images/premiere.png" alt="onurtaskiran" />
            Adobe Premiere
            <br />
          </p>
        </Col>
      </Row>
      <ScrollUpButton />
      <Footer />
    </>
  );
}

export default About;
