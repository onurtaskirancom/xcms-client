import { useContext, useState, useEffect } from 'react';
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
import CommentForm from "../../components/comments/CommentForm";
// import { ShareSocial } from "react-share-social";
import useCategory from "../../hooks/useCategory";
import useTag from "../../hooks/useTag";
import useLatestPosts from "../../hooks/useLatestPosts";
import { CalendarOutlined, TagsFilled } from "@ant-design/icons";
import { BorderlessTableOutlined } from "@ant-design/icons";
import renderHtml from "react-render-html";
import Footer from "../../components/pages/Footer";
import { AiOutlineFlag } from 'react-icons/ai';

import relativeTime from "dayjs/plugin/relativeTime";
import SidebarComponent from '../../components/pages/SidebarComponent';
dayjs.extend(relativeTime);

const { Title } = Typography;

const { Meta } = Card;

export const SinglePost = ({ post, postComments }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  // comments
  const [comments, setComments] = useState(postComments);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  // hooks
  const { categories } = useCategory();
  const { tags } = useTag();
  const { latestPosts } = useLatestPosts();

  useEffect(() => {
    setComments(postComments);
  }, [postComments]);

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
      <Head>
        <title>{post.title}</title>
        <meta
          description={renderHtml(post.content.substring(0, 160).slice(3, 160))}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@onurtskrncom"></meta>
        <meta name="twitter:title" content={post.title} />
        <meta
          name="twitter:url"
          content={`https://onurtaskiran.com/post/${post.slug}`}
        />
        <meta
          name="twitter:image"
          content={
            post?.featuredImage?.url ||
            'https://onurtaskiran.com/images/default.jpeg'
          }
        />

        <meta
          name="twitter:description"
          content={post.content.substring(0, 124).slice(3, 124)}
        ></meta>
      </Head>
      <Row style={{ paddingTop: '39px' }}>
        <Col
          className="content"
          flex="auto"
          xs={25}
          xl={14}
          offset={0}
          pull={1}
          push={1}
          style={{
            marginRight: '-20px',
            marginTop: 25,
            marginBottom: 25,
          }}
        >
          <Card className="allpost">
            <Title>{post.title}</Title>
            <img
              src={post?.featuredImage?.url || '/images/default.jpeg'}
              alt={post.title + ' - onurtaskiran.com '}
              height={'100%'}
              width={'100%'}
              style={{ borderRadius: '10px', marginBottom: '15px' }}
            />

            <p>
              <CalendarOutlined />
              &nbsp;{dayjs(post.createdAt).format('MMMM D, YYYY - HH:mm')}
              &nbsp; ~{' '}
              {post?.categories.map((c) => (
                <span key={c._id}>
                  <BorderlessTableOutlined />
                  <Link href={`/category/${c.slug}`}>
                    <a>{c.name} </a>
                  </Link>
                </span>
              ))}
            </p>
            {/* <Editor
              style={{background:"blue"}}
              defaultValue={post.content}
              dark={theme === "light" ? false : true}
              readOnly={true}
            /> */}

            {renderHtml(post.content)}

            <p>
              <br /> <AiOutlineFlag /> Tags: &nbsp;&nbsp;&nbsp;
              {post?.tags.map((t) => (
                <span key={t._id}>
                  <TagsFilled />
                  <Link href={`/tag/${t.slug}`}>
                    <Button type="dashed">{t.name}</Button>
                  </Link>
                </span>
              ))}
            </p>
            <br />

            {/* social share */}
            {/* <div style={{ marginTop: "-65px", marginBottom: "15px" }}>
              <ShareSocial
                url={process.browser && window.location.href}
                socialTypes={["facebook", "twitter", "linkedin", "reddit"]}
                style={{
                  height: "100px",
                  marginLeft: "-37px",
                  overflow: "hidden",
                  background: "none",
                }}
              />
            </div> */}
            <CommentForm
              comment={comment}
              setComment={setComment}
              handleSubmit={handleSubmit}
              loading={loading}
            />

            <div style={{ marginBottom: 50 }}></div>

            <List
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={(item) => (
                <List.Item key={item._id} id={item._id}>
                  <List.Item.Meta
                    avatar={<Avatar>{item?.postedBy?.name?.charAt(0)}</Avatar>}
                    title={item?.postedBy?.name}
                    description={`${item.content} - ${dayjs(
                      item.createdAt
                    ).fromNow()}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <SidebarComponent />
      </Row>
      <Footer />
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

export default SinglePost;
