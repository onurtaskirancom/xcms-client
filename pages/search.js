// import { useEffect, useState, useContext } from "react";
// import { Row, Col, Button, Input } from "antd";
// import AdminLayout from "../components/layout/AdminLayout";
// import Link from "next/link";
// import { PlusOutlined } from "@ant-design/icons";
// import axios from "axios";
// import { PostContext } from "../context/post";
// import { useRouter } from "next/router";
// import PostsList from "../components/posts/PostsList";
// import { AuthContext } from "../context/auth";

// function Search() {
//   // context
//   const [auth, setAuth] = useContext(AuthContext);
//   const [post, setPost] = useContext(PostContext);
//   // state
//   const [keyword, setKeyword] = useState("");
//   // hook
//   const router = useRouter();

//   const { posts } = post;

//   useEffect(() => {
//     if (auth?.token) fetchPosts();
//   }, [auth?.token]);

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const { data } = await axios.get("/posts-for-admin");
//       setPost((prev) => ({ ...prev, posts: data }));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleEdit = async (post) => {
//     // console.log("EDIT POST", post);
//     return router.push(`/admin/posts/${post.slug}`);
//   };

//   const handleDelete = async (post) => {
//     // console.log("DELETE POST", post);
//     try {
//       const answer = window.confirm("Are you sure you want to delete?");
//       if (!answer) return;
//       const { data } = await axios.delete(`/post/${post._id}`);
//       if (data.ok) {
//         setPost((prev) => ({
//           ...prev,
//           posts: prev.posts.filter((p) => p._id !== post._id),
//         }));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       <Row style={{ marginTop: 55 }}>
//         <Col span={24}>
//           <Button type="primary">
//             <Link href="/admin/posts/new">
//               <a>
//                 <PlusOutlined /> Add New
//               </a>
//             </Link>
//           </Button>
//           <h1 style={{ marginTop: 15 }}>{posts?.length} Posts</h1>

//           <Input
//             placeholder="Search"
//             type="search"
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value.toLowerCase())}
//           />

//           <PostsList
//             //  posts={posts?.filter((p) =>
//             //   p.title.toLowerCase().includes(keyword)
//             //  )}
//             posts ={posts?.filter(
//               (post) =>
//                 post.title?.toLowerCase().includes(keyword) ||
//                 post.content?.toLowerCase().includes(keyword)
//             )}
//           />

//           {/* <PostsList
//             posts={posts?.filter((p) =>
//               p.title.toLowerCase().includes(keyword)
//             )}
//             handleEdit={handleEdit}
//             handleDelete={handleDelete}
//           /> */}
//         </Col>
//       </Row>
//     </>
//   );
// }

// export default Search;

// import { useEffect, useState, useContext } from "react";
// import { Row, Col, Button, Input, List, Avatar } from "antd";
// import Link from "next/link";
// import { PlusOutlined } from "@ant-design/icons";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { AuthContext } from "../context/auth";
// import dayjs from "dayjs";
// import localizedFormat from "dayjs/plugin/localizedFormat";
// import SidebarComponent from "../components/pages/SidebarComponent";
// import Footer from "../components/pages/Footer";

// dayjs.extend(localizedFormat);

// function Search() {
//   // context
//   const [auth, setAuth] = useContext(AuthContext);
//   // state
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [totalp, setTotalp] = useState(0);
//   const [comments, setComments] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [keyword, setKeyword] = useState("");
//   // hook
//   const router = useRouter();

//   useEffect(() => {
//     if (auth?.token) {
//       fetchComments();
//       fetchPosts();
//       getTotal();
//       getTotalp();
//     }
//   }, [auth?.token]);

//   useEffect(() => {
//     if (page === 1) return;
//     if (auth?.token) fetchComments();
//     if (auth?.token) fetchPosts();
//   }, [page]);

//   useEffect(() => {
//     fetchComments();
//     fetchPosts();
//     getTotal();
//     getTotalp();
//   }, []);

//   useEffect(() => {
//     if (page === 1) return;
//     fetchComments();
//     fetchPosts();
//   }, [page]);

//   const fetchComments = async () => {
//     try {
//       const { data } = await axios.get(`/comments/${page}`);
//       //   console.log("__comments__", data);
//       setComments([...comments, ...data]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const fetchPosts = async () => {
//     try {
//       const { data } = await axios.get(`/posts/${page}`);
//       //   console.log("__comments__", data);
//       setPosts([...posts, ...data]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const getTotal = async () => {
//     try {
//       const { data } = await axios.get("/comment-count");
//       setTotal(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const getTotalp = async () => {
//     try {
//       const { data } = await axios.get("/post-count");
//       setTotalp(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const filteredComments = comments?.filter((comment) =>
//     comment.content.toLowerCase().includes(keyword)
//   );

//   const filteredPosts = posts?.filter(
//     (post) =>
//       post.content.toLowerCase().includes(keyword) ||
//       post.title.toLowerCase().includes(keyword)
//   );

//   const filteredPostst = posts?.filter((p) =>
//     p.title.toLowerCase().includes(keyword)
//   );
//   // posts={posts?.filter((p) =>
//   //     p.title.toLowerCase().includes(keyword)
//   //   )}

//   return (
//     <>
//       <Row>
//         {/* <Col span={24}>
//           <h1 style={{ marginTop: 15 }}>{comments?.length} Comments</h1>

//           <Input
//             placeholder="Search"
//             type="search"
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value.toLowerCase())}
//           />

//           <List
//             itemLayout="horizontal"
//             dataSource={filteredComments}
//             renderItem={(item) => (
//               <List.Item
//                 actions={[
//                   <Link href={`/post/${item?.postId?.slug}#${item._id}`}>
//                     <a>view</a>
//                   </Link>,
//                   <a onClick={() => handleDelete(item)}>delete</a>,
//                 ]}
//               >
//                 <List.Item.Meta
//                   description={`On ${item?.postId?.title} | ${
//                     item?.postedBy?.name
//                   } | ${dayjs(item.createdAt).format("L LT")}`}
//                   title={item.content}
//                 />
//               </List.Item>
//             )}
//           />
//         </Col> */}
//         <Col span={8} offset={2}  flex="auto"
//           xs={15}
//           xl={15}
//           pull={9}
//           push={1}>
//           <h1 style={{ marginTop: 15 }}>{posts?.length} Posts</h1>

//           <Input
//             size="large"
//             placeholder="Search"
//             type="search"
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value.toLowerCase())}
//           />

//           <List
//             itemLayout="horizontal"
//             dataSource={filteredPosts}
//             renderItem={(item) => (
//               <List.Item
//                 actions={[
//                   <Link href={`/post/${item.slug}`}>
//                     <a>
//                       <Avatar
//                         shape="square"
//                         style={{ height: "100px", width: "300px" }}
//                         src={item.featuredImage?.url || "images/default.jpeg"}
//                         alt={item.title}
//                       />
//                       <List.Item.Meta
//                         description={`${item?.postedBy?.name} | ${dayjs(
//                           item.createdAt
//                         ).format("L LT")}`}
//                         title={item.title}
//                       />
//                     </a>
//                   </Link>,
//                 ]}
//               >
//                 {/* <List.Item.Meta
//                   description={`${item?.postedBy?.name} | ${dayjs(
//                     item.createdAt
//                   ).format("L LT")}`}

//                   title={item.title}
//                 /> */}
//               </List.Item>
//             )}
//           />
//           <div style={{ marginTop: "25px" }}></div>
//         </Col>
//       </Row>

//       {page * 6 < total &&   (
//         <Row>
//           <Col span={24} style={{ textAlign: "center" }}>
//             <Button
//               size="large"
//               type="primary"
//               loading={loading}
//               onClick={() => setPage(page + 1)}
//             >
//               Load More
//             </Button>
//           </Col>
//         </Row>
//       )}

//       <Footer />
//     </>
//   );
// }

// export default Search;

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

dayjs.extend(localizedFormat);

function Search() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalp, setTotalp] = useState(0);
  const [comments, setComments] = useState([]);
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
      fetchComments();
      fetchPosts();
      getTotal();
      getTotalp();
    }
  }, [auth?.token]);

  useEffect(() => {
    if (page === 1) return;
    if (auth?.token) fetchComments();
    if (auth?.token) fetchPosts();
  }, [page]);

  useEffect(() => {
    fetchComments();
    fetchPosts();
    getTotal();
    getTotalp();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/comments/${page}`);
      //   console.log("__comments__", data);
      setComments([...comments, ...data]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("/posts-for-admin");
      setPost((prev) => ({ ...prev, posts: data }));
    } catch (err) {
      console.log(err);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/comment-count");
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTotalp = async () => {
    try {
      const { data } = await axios.get("/post-count");
      setTotalp(data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredComments = comments?.filter((comment) =>
    comment.content.toLowerCase().includes(keyword)
  );

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
            style={{ width: "93%" }}
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
                    <a>
                      <Col
                        flex="auto"
                        span={5}
                        xs={3}
                        xl={7}
                        offset={0}
                        pull={0}
                        push={0}
                        style={{ marginLeft: "-70px" }}
                      >
                        <Avatar
                          shape="square"
                          style={{ height: "100%", width: "100%" }}
                          src={item.featuredImage?.url || "images/default.jpeg"}
                          alt={item.title}
                        />

                        {/* <List.Item.Meta
                           style={{ width: "100%", float: "right"}}
                            description={`${item?.postedBy?.name} | ${dayjs(
                              item.createdAt
                            ).format("L LT")}`}
                            title={item.title}
                          /> */}

                        <h3>{item.title}</h3>
                        <p>{item.content.substring(0, 460)}...</p>
                        <List.Item.Meta
                          description={` ${dayjs(item.createdAt).format(
                            "MMMM D, YYYY h:m A"
                          )}`}
                        />
                      </Col>
                    </a>
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
                <br />
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

      <Footer />
    </>
  );
}

export default Search;
