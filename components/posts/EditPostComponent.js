import { useContext, useState, useEffect } from "react";
import { Layout, Row, Col, Input, Select, Modal, Button, Image } from "antd";
// import Editor from "rich-markdown-editor";
import { ThemeContext } from "../../context/theme";
import axios from "axios";
import { uploadImage } from "../../functions/upload";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { UploadOutlined } from "@ant-design/icons";
import Media from "../media";
import { MediaContext } from "../../context/media";
import { Editor } from '@tinymce/tinymce-react';

const { Option } = Select;

function EditPost({ page = "admin" }) {
  // context
  const [theme, setTheme] = useContext(ThemeContext);
  const [media, setMedia] = useContext(MediaContext);
  // state
  const [postId, setPostId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]); // post's existing categories
  const [tags, setTags] = useState([]); // post's existing tags
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [loadedTags, setLoadedTags] = useState([]);
  const [featuredImage, setFeaturedImage] = useState({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  // media Modal
  // const [visibleMedia, setVisibleMedia] = useState(false);
  // hook
  const router = useRouter();

  useEffect(() => {
    loadPost();
  }, [router?.query?.slug]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadTags();
  }, []);

  const loadPost = async () => {
    try {
      const { data } = await axios.get(`/post/${router.query.slug}`);
      console.log("GOT POST FOR EDIT", data);
      setTitle(data.post.title);
      setContent(data.post.content);
      setFeaturedImage(data.post.featuredImage);
      setPostId(data.post._id);
      // push category names
      let arr = [];
      data.post.categories.map((c) => arr.push(c.name));
      setCategories(arr);
      setLoading(false);
      // push tag names
      let arrt = [];
      data.post.tags.map((t) => arrt.push(t.name));
      setTags(arrt);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setLoadedCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadTags = async () => {
    try {
      const { data } = await axios.get("/tags");
      setLoadedTags(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/edit-post/${postId}`, {
        title,
        content,
        categories,
        tags,
        featuredImage: media?.selected?._id
          ? media?.selected?._id
          : featuredImage?._id
          ? featuredImage._id
          : undefined,
      });
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        // console.log("POST PUBLISHED RES => ", data);
        toast.success("Post updated successfully");
        setMedia({ ...media, selected: null });
        router.push(`/${page}/posts`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Post create failed. Try again.");
      setLoading(false);
    }
  };

  const handleBody = (e) => {
    console.log(e);
    setContent(e);
   //formData.set("body", e);
   if (typeof window !== "undefined") {
     localStorage.setItem("posts", JSON.stringify(e));
   }
 };

  return (
    <Row style={{ paddingTop: "59px" }}>
      <Col span={14} offset={1}>
        <h1>Edit post</h1>
        <Input
          size="large"
          value={title}
          placeholder="Give your post a title"
          onChange={(e) => {
            setTitle(e.target.value);
            localStorage.setItem("post-title", JSON.stringify(e.target.value));
          }}
        />
        <br />
        <br />

        {loading ? (
          <div>Loading...</div>
    
        ) : (
          <div className="editor-scroll">
            <Editor
              //dark={theme === "light" ? false : true}
              //defaultValue={content}
              initialValue={content}
              onEditorChange={handleBody}
              init={{
                //  height: 500,
                //  menubar: false,
                //  plugins: [
                //    'advlist autolink lists link image charmap print preview anchor',
                //    'searchreplace visualblocks code fullscreen',
                //    'insertdatetime media table paste code help wordcount'
                //  ],
                //  toolbar: 'undo redo | formatselect | ' +
                //  'bold italic backcolor | alignleft aligncenter ' +
                //  'alignright alignjustify | bullist numlist outdent indent | ' +
                //  'removeformat | help',
               // selector: 'textarea',
              //plugins: ['autosave', 'lists', 'code', 'image', 'image code', 'fullscreen',  'tabfocus', 'image media link tinydrive code imagetools', 'emoticons', 'searchreplace', 'directionality', 'importcss', 'lists', 'fullpage', 'table', 'template', 'wordcount', 'visualchars', 'paste','autosave lists autolink', 'textarea', 'visualblocks', 'advlist','image imagetools', 'anchor', 'autosave', 'autolink', 'autoresize','bbcode','charmap', 'codesample', 'print', 'save', 'quickbars', 'autolink'],
              plugins: 'print preview  importcss autoresize code fullpage tinydrive searchreplace autolink autosave save directionality  visualblocks visualchars fullscreen image link media  template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists  wordcount   imagetools textpattern noneditable help    charmap   quickbars  emoticons ',
              codesample_languages: [
                { text: 'css', value: 'css' },
                { text: 'javascript', value: 'javascript' },
                { text: 'aspnet', value: 'aspnet' },
                { text: 'c', value: 'c' },
                { text: 'csharp', value: 'csharp' },
                { text: 'django', value: 'django' },
                { text: 'git', value: 'git' },
                { text: 'go', value: 'go' },
                { text: 'java', value: 'java' },
                { text: 'nginx', value: 'nginx' },
                { text: 'php', value: 'php' },
                { text: 'python', value: 'python' },
                { text: 'sass', value: 'sass' },
                { text: 'scss', value: 'scss' },
                { text: 'swift', value: 'swift' },
                { text: 'typescript', value: 'typescript' },
                { text: 'phpdoc', value: 'phpdoc' },
                { text: 'json', value: 'json' }
              ],
      
              toolbar: 'undo redo  | bold italic |  code |link | visualblocks | image |undo redo styleselect bold italic alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
              icon: 'bold',
              tooltip: 'Formatting',
              toolbar_sticky: true,
              items: 'bold italic underline | superscript subscript'
               }}
              onChange={(v) => {
                // setContent(v());
                // localStorage.setItem("post-content", JSON.stringify(v()));
              }}
              uploadImage={uploadImage}
            />
          </div>
        )}

        <br />
        <br />

        {/* <pre>{JSON.stringify(loadedCategories, null, 4)}</pre> */}
      </Col>

      <Col span={6} offset={1}>
        <Button
          style={{ margin: "10px 0px 10px 0px", width: "100%" }}
          onClick={() => setVisible(true)}
        >
          Preview
        </Button>

        <Button
          style={{ margin: "10px 0px 10px 0px", width: "100%" }}
          onClick={() => setMedia({ ...media, showMediaModal: true })}
        >
          <UploadOutlined /> Featured Image
        </Button>

        <h4>Categories</h4>

        <Select
          mode="multiple"
          allowClear={true}
          placeholder="Select categories"
          style={{ width: "100%" }}
          onChange={(v) => setCategories(v)}
          value={[...categories]}
        >
          {loadedCategories.map((item) => (
            <Option key={item.name}>{item.name}</Option>
          ))}
        </Select>

        <h4>Tags</h4>

        <Select
          mode="multiple"
          allowClear={true}
          placeholder="Select tags"
          style={{ width: "100%" }}
          onChange={(t) => setTags(t)}
          value={[...tags]}
        >
          {loadedTags.map((itemt) => (
            <Option key={itemt.name}>{itemt.name}</Option>
          ))}
        </Select>

        {media?.selected ? (
          <div style={{ marginTop: "15px" }}>
            <Image width="100%" src={media?.selected?.url} />
          </div>
        ) : featuredImage?.url ? (
          <div style={{ marginTop: "15px" }}>
            <Image width="100%" src={featuredImage?.url} />
          </div>
        ) : (
          ""
        )}

        <Button
          loading={loading}
          style={{ margin: "10px 0px 10px 0px", width: "100%" }}
          type="primary"
          onClick={handlePublish}
        >
          Publish
        </Button>
      </Col>
      {/* preview modal */}
      <Modal
        title="Preview"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={720}
        footer={null}
      >
        <h1>{title}</h1>
        <Editor
          dark={theme === "light" ? false : true}
          defaultValue={content}
          readOnly={true}
        />
      </Modal>
      {/* media modal */}
      <Modal
        visible={media.showMediaModal}
        title="Media"
        onOk={() => setMedia({ ...media, showMediaModal: false })}
        onCancel={() => setMedia({ ...media, showMediaModal: false })}
        width={720}
        footer={null}
      >
        <Media />
      </Modal>
    </Row>
  );
}

export default EditPost;
