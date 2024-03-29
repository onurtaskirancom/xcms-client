import { useContext, useState } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  Typography,
  List,
  Avatar,
  Divider,
  Button,
} from "antd";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import Editor from "rich-markdown-editor";
import { ThemeContext } from "../../context/theme";
import CommentForm from "../comments/CommentForm";
import { ShareSocial } from "react-share-social";
import useCategory from "../../hooks/useCategory";
import useTag from "../../hooks/useTag";
import useLatestPosts from "../../hooks/useLatestPosts";
import { RightCircleFilled } from "@ant-design/icons";
import { BorderlessTableOutlined } from "@ant-design/icons";
import { GithubOutlined } from "@ant-design/icons";
import { LinkedinOutlined } from "@ant-design/icons";
import { TwitterOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { InstagramOutlined } from "@ant-design/icons";
import relativeTime from "dayjs/plugin/relativeTime";
import ScrollUpButton from "react-scroll-up-button";

dayjs.extend(relativeTime);

const { Title } = Typography;

const { Meta } = Card;

export const SidebarPost = ({ post, postComments }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  // comments
  const [comments, setComments] = useState(postComments);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  // hooks
  const { categories } = useCategory();
  const { tags } = useTag();
  const { latestPosts } = useLatestPosts();
  const [size, setSize] = useState("large");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/comment/${post._id}`, { comment });
      setComments([data, ...comments]);
      setComment("");
      toast.success("Comment posted successfully");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Col
        flex="400px"
        xs={25}
        xl={12}
        offset={1}
        pull={1}
        push={1}
        style={{ marginRight: "-20px", paddingTop: "20px" }}
      >
        <Divider>onurtaskiran</Divider>
        <div>
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
          <br/>
          <p style={{ fontSize: 17, color:"gray" }}>
         
            The site generally consists of articles I have written on software,
            web technologies, cinema, and sports.   </p>
            
            <p style={{ fontSize: 17, color:"gray" }}> You can search from the
            <Link href="/posts">
                <a> posts </a>
             </Link>
            page and send me a message from the 
            <Link href="/contact">
                <a> contact</a> 
                </Link> page. You need to be a
                <Link href="/signup">
                    <a> Signup </a>  
                    </Link> to comment on the posts, you don't dont be shy, you can
            comment freely. Good luck everyone. 
          </p>
        </div>
        {/* social media */}
        <Divider>Social Media</Divider>
        <div style={{ fontSize: "45px" }}>
          <a href="https://github.com/onurtaskirancom" target="_blank">
            <GithubOutlined />
          </a>
          &nbsp;
          <a
            href="https://tr.linkedin.com/in/onur-taşkıran-3b906825b"
            target="_blank"
          >
            <LinkedinOutlined />
          </a>
          &nbsp;
          <a href="https://twitter.com/onurtskrncom" target="_blank">
            <TwitterOutlined />
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
        <Divider>Categories</Divider>
        {categories.map((c) => (
          <Link href={`/category/${c.slug}`} key={c._id}>
            <a>
              {/* <Button
                size={size}
                type="default"
                style={{ margin: 2, width: "80%", fontSize: "17px", marginLeft:"10%"}}
              >
                <HddFilled style={{ float: "left" }} />
                {c.name}
              </Button> */}
              <h3 className=" dClass hover-x">
                <BorderlessTableOutlined />
                &nbsp;&nbsp;{c.name}
              </h3>
            </a>
          </Link>
        ))}
        <Divider>Tags</Divider>
        {tags.map((t) => (
          <Link href={`/tag/${t.slug}`} key={t._id}>
            <a>
              <Button type="dashed" style={{ margin: 2 }}>
                {t.name}
              </Button>
            </a>
          </Link>
        ))}
        <ScrollUpButton />
      </Col>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`${process.env.API}/post/${params.slug}`);
  return {
    props: {
      post: data.post,
      postComments: data.comments,
    },
  };
}

export default SidebarPost;
