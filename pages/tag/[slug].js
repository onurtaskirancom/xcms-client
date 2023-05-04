import axios from "axios";
import { Card, Row, Col, Button, Divider, Avatar, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useLatestPosts from "../../hooks/useLatestPosts";
import useCategory from "../../hooks/useCategory";
import useTag from "../../hooks/useTag";
import { BorderlessTableOutlined, UserOutlined } from "@ant-design/icons";
import { RightCircleFilled } from "@ant-design/icons";
import Footer from "../../components/pages/Footer";
import ScrollUpButton from "react-scroll-up-button";
import SidebarComponent from "../../components/pages/SidebarComponent";

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
          <h1 style={{ textAlign: 'center' }}>Tag: {tag.name}</h1>

          {/* posts list */}

          {posts.map((post) => (
            <Card key={post._id}>
              <div style={{ display: 'flex', width: '80%', float: 'left' }}>
                <Avatar
                  shape="square"
                  //size={60}
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
