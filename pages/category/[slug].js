import axios from "axios";
import { Card, Row, Col, Button, Divider, Avatar, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useCategory from "../../hooks/useCategory";
import useLatestPosts from "../../hooks/useLatestPosts";
import useTag from "../../hooks/useTag";
import { BorderlessTableOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { RightCircleFilled } from "@ant-design/icons";
import Footer from "../../components/pages/Footer";
import ScrollUpButton from "react-scroll-up-button";
import SidebarComponent from "../../components/pages/SidebarComponent";

dayjs.extend(relativeTime);
const { Title } = Typography;

const SingleCategory = ({ posts, category, tag }) => {
  // hooks
  const { categories } = useCategory();
  const { latestPosts } = useLatestPosts();
  const { tags } = useTag();

  return (
    <>
      <Head>
        <title>{category.name}</title>
        <meta
          name="description"
          content={`Read latest posts on ${category.name}`}
        />
      </Head>

      <Row style={{ paddingTop: '39px' }}>
        <Col
          flex="auto"
          xs={25}
          xl={14}
          offset={0}
          pull={1}
          push={1}
          style={{
            marginRight: '-20px',
            marginLeft: '30px',
            marginTop: 25,
            marginBottom: 25,
          }}
        >
          <h1 style={{ textAlign: 'center' }}>Category: {category.name}</h1>

          {/* posts list */}

          {posts.map((post) => (
            <Card key={post._id}>
              <div style={{ display: 'flex', width: '80%', float: 'left' }}>
                <Avatar
                  shape="square"
                  //size={160}
                  // style={{ marginRight: 15 }}
                  style={{ height: '100%', width: '100%', marginRight: 15 }}
                  src={post.featuredImage?.url || '/images/default.jpeg'}
                  alt={post.title}
                />

                <div style={{ width: '100%', float: 'right' }}>
                  <Link href={`/post/${post.slug}`}>
                    <a>
                      <Title level={3}>{post.title}</Title>
                    </a>
                  </Link>
                  <p>
                    <CalendarOutlined />
                    &nbsp;
                    {dayjs(post.createdAt).format('MMMM D, YYYY - HH:mm')} ~
                    <UserOutlined /> {post?.postedBy?.name}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </Col>
        <SidebarComponent />
      </Row>
      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    `${process.env.API}/posts-by-category/${params.slug}`
  );
  return {
    props: {
      posts: data.posts,
      category: data.category,
    },
  };
}

export default SingleCategory;
