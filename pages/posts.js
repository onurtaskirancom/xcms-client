import { useEffect, useState, useContext } from "react";
import { Card, Row, Col, Button, Input, List, Avatar, Divider } from "antd";
import Link from "next/link";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthContext } from "../context/auth";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import SidebarComponent from "../components/pages/SidebarComponent";
import Footer from "../components/pages/Footer";
import { PostContext } from "../context/post";
import useCategory from "../hooks/useCategory";
import useLatestPosts from "../hooks/useLatestPosts";
import useTag from "../hooks/useTag";
import { BorderlessTableOutlined } from "@ant-design/icons";
import { RightCircleFilled } from "@ant-design/icons";
import renderHtml from "react-render-html";
import ScrollUpButton from "react-scroll-up-button";

dayjs.extend(localizedFormat);

function Posts() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [page, setPage] = useState(1);
  //const [total, setTotal] = useState(0);
  const [totalp, setTotalp] = useState(0);
  // const [comments, setComments] = useState([]);
  //const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [post, setPost] = useContext(PostContext);
  // hook
  const router = useRouter();
  const { categories } = useCategory();
  const { latestPosts } = useLatestPosts();
  const { tags } = useTag();

  const { posts } = post;

  useEffect(() => {
    if (auth?.token) {
     // fetchComments();
      fetchPosts();
      //getTotal();
      getTotalp();
    }
  }, [auth?.token]);

  useEffect(() => {
    if (page === 1) return;
    //if (auth?.token) fetchComments();
    if (auth?.token) fetchPosts();
  }, [page]);

  useEffect(() => {
   // fetchComments();
    fetchPosts();
   // getTotal();
    getTotalp();
  }, []);

  // const fetchComments = async () => {
  //   try {
  //     const { data } = await axios.get(`/comments/${page}`);
  //     //   console.log("__comments__", data);
  //     setComments([...comments, ...data]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("/posts-for-all");
      setPost((prev) => ({ ...prev, posts: data }));
    } catch (err) {
      console.log(err);
    }
  };

  // const getTotal = async () => {
  //   try {
  //     const { data } = await axios.get("/comment-count");
  //     setTotal(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getTotalp = async () => {
    try {
      const { data } = await axios.get("/post-count");
      setTotalp(data);
    } catch (err) {
      console.log(err);
    }
  };

  // const filteredComments = comments?.filter((comment) =>
  //   comment.content.toLowerCase().includes(keyword)
  // );

  const filteredPosts = posts?.filter(
    (post) =>
      post.content.toLowerCase().includes(keyword) ||
      post.title.toLowerCase().includes(keyword)
  );

  const filteredPostst = posts?.filter((p) =>
    p.title.toLowerCase().includes(keyword)
  );
  // posts={posts?.filter((p) =>
  //     p.title.toLowerCase().includes(keyword)
  //   )}

  return (
    <>
      <Row style={{ paddingTop: "39px" }}>
        <Col
          flex="auto"
          xs={25}
          xl={14}
          offset={0}
          pull={1}
          push={1}
          style={{
            overflow: "hidden",
            marginRight: "-20px",
            marginLeft: "30px",
            marginTop: 25,
            marginBottom: 25,
          }}
        >
          <Card>
            <h1 style={{ marginTop: 15 }}>{posts?.length} Posts</h1>

            <Input
              prefix={<SearchOutlined className="site-form-item-icon" />}
              style={{ width: "95%" }}
              size="large"
              placeholder="Search"
              type="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value.toLowerCase())}
            />

            <List
              itemLayout="horizontal"
              dataSource={filteredPosts}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Link href={`/post/${item.slug}`}>
                      <Col
                        // flex="auto"
                        // span={12}
                        // xs={12}
                        // xl={9}
                        // offset={0}
                        // pull={0}
                        // push={0}
                        // style={{ marginLeft: "-75px", width:"95%"  }}
                        flex="auto"
                        xs={3}
                        xl={9}
                        offset={0}
                        pull={0}
                        push={0}
                        style={{
                          marginRight: "2px",
                          marginLeft: "-52px",
                          marginTop: 25,
                          marginBottom: 25,
                          width: "100%",
                        }}
                      >
                        {/* <Avatar
                            shape="square"
                            style={{ height: "100%", width: "100%" }}
                            src={
                              item.featuredImage?.url || "images/default.jpeg"
                            }
                            alt={item.title}
                          /> */}

                        {/* <List.Item.Meta
                           style={{ width: "100%", float: "right"}}
                            description={`${item?.postedBy?.name} | ${dayjs(
                              item.createdAt
                            ).format("L LT")}`}
                            title={item.title}
                          /> */}
                        <a>
                          <h2 style={{ textAlign: "left" }}>{item.title}</h2>
                        </a>
                        <List.Item.Meta
                          style={{ textAlign: "justify" }}
                          description={` ${dayjs(item.createdAt).format(
                            "MMMM D, YYYY h:m A"
                          )}`}
                        />
                        <div
                          style={{
                            textAlign: "left",
                            fontSize: "18px",
                            display: "inline-block",
                            wordWrap: "break-word",
                          }}
                        >
                         
                          {renderHtml(item.content.substring(0, 290))}...
                       
                        </div>
                      </Col>
                    </Link>,
                  ]}
                ></List.Item>
              )}
            />

            <div style={{ marginTop: "25px" }}></div>
          </Card>
        </Col>
        <Col
          flex="400px"
          xs={25}
          xl={12}
          offset={1}
          pull={1}
          push={1}
          style={{ marginRight: "-20px", paddingTop: "20px" }}
        >
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
          <Divider>Latest Posts</Divider>
          {latestPosts.map((p) => (
            <Link href={`/post/${p.slug}`} key={p._id}>
              <a>
                {/* <h3>{p.title}</h3>
                <hr /> */}

                <h4 className=" dClass hover-x">
                  <RightCircleFilled />
                  &nbsp;&nbsp;{p.title}
                </h4>
                <br />
              </a>
            </Link>
          ))}
        </Col>
      </Row>
      <ScrollUpButton />
      <Footer />
    </>
  );
}

export default Posts;
