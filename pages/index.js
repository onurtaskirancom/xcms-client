import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, Avatar, Button } from "antd";
import Head from "next/head";
import Link from "next/link";
import SidebarComponent from "../components/pages/SidebarComponent";
import { renderToHtml } from "rich-markdown-editor";
import Editor from "rich-markdown-editor";
import { ThemeContext } from "../context/theme";
import Footer from "../components/pages/Footer";
import dayjs from "dayjs";
import { BorderlessTableOutlined } from "@ant-design/icons";
import renderHtml from "react-render-html";

const { Meta } = Card;

export const Home = ({ posts }) => {
  // state
  const [allPosts, setAllPosts] = useState(posts);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/post-count");
      //console.log("total", data);
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/posts/${page}`);
      setAllPosts([...allPosts, ...data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Onur Taskiran blog web site</title>
        <meta description="Blog posts about web development, programming etc" />
      </Head>
      <Row style={{ paddingTop: "39px" }}>
        <Col
          flex="auto"
          xs={25}
          xl={14}
          offset={0}
          pull={1}
          push={1}
          style={{
            marginRight: "-20px",
            marginLeft: "30px",
            marginTop: 25,
            marginBottom: 25,
          }}
        >
          {allPosts.map((post, i) => (
            <Card key={i} style={{ marginTop: "25px" }} hoverable>
              {/* <Meta title={post.title} /> */}
              <Link  href={`/post/${post.slug}`}>
                <a>
                  <h2>{post.title}</h2>
                </a>
              </Link>
              <p>
                {dayjs(post.createdAt).format("MMMM D, YYYY h:mm A")}
                &nbsp; ~{" "}
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
              defaultValue={post.content}
              dark={theme === "light" ? false : true}
              readOnly={true}
              scrollTo={false}
            /> */}
              <Link href={`/post/${post.slug}`}>
                <a>
                  <Avatar
                    shape="square"
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                    src={post.featuredImage?.url || "images/default.jpeg"}
                    alt={post.title}
                  />
                </a>
              </Link>
              {/* {post.content.substring(0, 460)}... */}
              {/* {renderHtml(post.content)} */}
              {renderHtml(post.content.substring(0, 460))}
              <Link href={`/post/${post.slug}`}>
                <a>
                  <Button type="dashed">Read More...</Button>
                </a>
              </Link>
            </Card>
          ))}
          {allPosts?.length < total && (
            <Button
            style={{marginLeft:"40%", marginTop:"10px"}}
              size="large"
              type="dashed"
              loading={loading}
              onClick={() => setPage(page + 1)}
            >
              Load More
            </Button>
          )}
        </Col>

        <SidebarComponent />
      </Row>

      {/* {allPosts?.length < total && (
        <Row>
          <Col
            span={14}
            xs={3}
            offset={1}
            style={{ textAlign: "center", padding: 50 }}
          >
            <Button
              size="large"
              type="primary"
              loading={loading}
              onClick={() => setPage(page + 1)}
            >
              Load More
            </Button>
          </Col>
        </Row>
      )} */}
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/posts/1`);
  return {
    props: {
      posts: data,
    },
  };
}

export default Home;
