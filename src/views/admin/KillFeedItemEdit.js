import {
  CContainer,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CAlert,
} from "@coreui/react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardSidebar from "../../components/dashboard/Sidebar";
import { getBossKillById } from "../../services/bosskillService";
// import BlogListItem from "../../components/dashboard/blog/BlogListItem";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import "./Dashboard.scss";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

const KillFeedItemEditView = (props) => {
  let { id } = useParams();
  //eslint-disable-next-line
  const navigate = useNavigate();
  const [titleErrorVisible, setTitleErrorVisible] = useState(false);
  const [contentErrorVisible, setContentErrorVisible] = useState(false);
  const [post, setPost] = useState([]);
  useEffect(() => {
    getBlogPost(id);
    return () => {
      setPost([]);
    };
    //eslint-disable-next-line
  }, []);
  // console.log(post);
  async function getBlogPost(id) {
    const response = await getBossKillById(id);
    setPost(response.data);
    // console.log(response.data);
  }

  const handleChange = (event) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value,
    });
  };

  function handleEditorChange({ html, text }) {
    // console.log("handleEditorChange", html, text);
    setPost({ ...post, content: text });
    // console.log(post.content);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (post.title === "") {
      setTitleErrorVisible(true);
      return;
    }
    if (post.content === "") {
      setContentErrorVisible(true);
      return;
    }
    // const response = await updateBlogPost(post, id);
    // navigate("/dashboard/bloglist");
    // setPost({
    //   title: "",
    //   content: "",
    // });
  };

  // console.log(blogposts);
  return (
    <div className="adminContainer">
      <div className="adminSidebar">
        <DashboardSidebar />
      </div>
      <div className="adminContent">
        <CContainer fluid>
          <CForm>
            <CRow>
              <div className="mb-3">
                <CFormLabel htmlFor="title">Titel</CFormLabel>
                <CFormInput
                  onChange={handleChange}
                  value={post.title}
                  name="title"
                  className="form-control"
                  placeholder="title"
                  type="text"
                  required
                />
                {titleErrorVisible && (
                  <div>
                    <br />
                    <CAlert color="warning">Titel eingeben!</CAlert>
                  </div>
                )}
              </div>
            </CRow>

            <CRow>
              <div className="mb-3">
                <MdEditor
                  value={post.content}
                  style={{ height: "500px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={handleEditorChange}
                />
              </div>
              {contentErrorVisible && (
                <div>
                  <br />
                  <CAlert color="warning">Inhalt eingeben!</CAlert>
                </div>
              )}
            </CRow>
            <CButton type="submit" color="dark" onClick={handleSubmit}>
              Abschicken
            </CButton>
          </CForm>
        </CContainer>
      </div>
    </div>
  );
};

export default KillFeedItemEditView;
