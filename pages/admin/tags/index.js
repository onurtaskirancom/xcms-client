import { useState, useEffect, useContext } from "react";
import { Layout } from "antd";
import AdminLayout from "../../../components/layout/AdminLayout";
import { Form, Input, Row, Col, Button, List } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-hot-toast";
import TagUpdateModal from "../../../components/modal/TagUpdateModal";
import { PostContext } from "../../..//context/post";

const { Content, Sider } = Layout;

function Tags() {
  // context
  const [post, setPost] = useContext(PostContext);

  // state
  const [loading, setLoading] = useState(false);

  // update state
  const [updatingTag, setUpdatingTag] = useState({});
  const [visible, setVisible] = useState(false);
  // hooks
  const [form] = Form.useForm();

  const { tags } = post;

  useEffect(() => {
    getTags();
  }, []);

  const getTags = async () => {
    try {
      const { data } = await axios.get("/tags");
      setPost((prev) => ({ ...prev, tags: data }));
    } catch (err) {
      console.log(err);
    }
  };

  const onFinish = async (values) => {
    // console.log("values => ", values);
    try {
      setLoading(true);
      const { data } = await axios.post("/tag", values);
      setPost((prev) => ({ ...prev, tags: [data, ...tags] }));
      // console.log(data);
      toast.success("Tag created successfully");
      setLoading(false);
      form.resetFields(["name"]);
    } catch (err) {
      console.log(err);
      toast.error("Tag create failed");
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      const { data } = await axios.delete(`/tag/${item.slug}`);
      setPost(prev => ({
        ...prev,
        tags: tags.filter((cat) => cat._id!== data._id),
      }));
      toast.success("Tag deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Tag delete failed");
    }
  };

  const handleEdit = async (item) => {
    setUpdatingTag(item);
    setVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      const { data } = await axios.put(
        `/tag/${updatingTag.slug}`,
        values
      );
      const newTags = tags.map((cat) => {
        if (cat._id === data._id) {
          return data;
        }
        return cat;
      });
      setPost((prev) => ({...prev, tags: newTags }));
      toast.success("Tag updated successfully");
      setVisible(false);
      setUpdatingTag({});
    } catch (err) {
      console.log(err);
      toast.error("Tag update failed");
    }
  };

  return (
    <AdminLayout>
      <Row style={{paddingTop: "59px"}}>
        {/* first column */}
        <Col xs={22} sm={22} lg={10} offset={1}>
          <h1>Tags</h1>
          <p>Add new tag</p>

          <Form onFinish={onFinish} form={form}>
            <Form.Item name="name">
              <Input
                prefix={<EditOutlined className="site-form-item-icon" />}
                placeholder="Give it a name"
              />
            </Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Col>
        {/* second column */}
        <Col xs={22} sm={22} lg={10} offset={1}>
          <List
            itemLayout="horizontal"
            dataSource={tags}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a onClick={() => handleEdit(item)}>edit</a>,
                  <a onClick={() => handleDelete(item)}>delete</a>,
                ]}
              >
                <List.Item.Meta title={item.name} />
              </List.Item>
            )}
          ></List>
        </Col>

        <TagUpdateModal
          visible={visible}
          setVisible={setVisible}
          handleUpdate={handleUpdate}
          updatingTag={updatingTag}
        />
      </Row>
    </AdminLayout>
  );
}

export default Tags;
