import axios from "axios";
import { Card, Row, Col, Button, Divider, Avatar, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useLatestPosts from "../../hooks/useLatestPosts";
import useCategory from "../../hooks/useCategory";
import useTag from "../../hooks/useTag";
import { BorderlessTableOutlined } from "@ant-design/icons";
import { RightCircleFilled } from "@ant-design/icons";
import Footer from "../../components/pages/Footer";


dayjs.extend(relativeTime);
const { Title } = Typography;

const SingleTag = ({ posts, tag }) => {
  // hooks
  const { tags } = useTag();
  const { categories } = useCategory();
  const { latestPosts } = useLatestPosts();

  return (
    <>
      <Head>
        <title>{tag.name}</title>
        <meta name="description" content={`Read latest posts on ${tag.name}`} />
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
          <h1 style={{ textAlign: "center" }}>Tag: {tag.name}</h1>

          {/* posts list */}

          {posts.map((post) => (
            <Card key={post._id}>
              <div  style={{ display: "flex", width: "80%", float: "left" }}>
                <Avatar
                  shape="square"
                  //size={60}
                  style={{ height: "100px", width: "300px", marginRight: 15 }}
                  src={post.featuredImage?.url || "/images/default.jpeg"}
                  alt={post.title}
                />

                <div style={{width: "100%", float: "right"}}>
                  <Link href={`/post/${post.slug}`}>
                    <a>
                      <Title level={3}>{post.title}</Title>
                    </a>
                  </Link>
                  <p>
                    {dayjs(post.createdAt).format("MMMM D, YYYY h:m A")} / by{" "}
                    {post?.postedBy?.name}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </Col>

        <Col 
        flex="400px"
        xs={25}
        xl={12}
        offset={1}
        pull={1}
        push={1}
        style={{ marginRight: "-20px", paddingTop: "20px" }}>
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
      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    `${process.env.API}/posts-by-tag/${params.slug}`
  );
  return {
    props: {
      posts: data.posts,
      tag: data.tag,
    },
  };
}

export default SingleTag;
