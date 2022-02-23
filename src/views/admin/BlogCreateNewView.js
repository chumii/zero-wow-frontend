import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import DashboardSidebar from "../../components/dashboard/Sidebar";
import "./Dashboard.scss";
import {
  CCol,
  CContainer,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CAlert,
} from "@coreui/react";
import { createBlogPost } from "../../services/blogService";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

const BlogCreateNewView = () => {
  // const editorRef = useRef(null);
  const navigate = useNavigate();
  const [titleErrorVisible, setTitleErrorVisible] = useState(false);
  const [contentErrorVisible, setContentErrorVisible] = useState(false);
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    setPost({
      title: "",
      content: "",
    });
    return () => {
      setPost({
        title: "",
        content: "",
      });
    };
  }, []);

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
    const response = await createBlogPost(post);
    navigate("/dashboard/bloglist");
    setPost({
      title: "",
      content: "",
    });
    return response;
  };

  return (
    <div className="adminContainer">
      <div className="adminSidebar">
        <DashboardSidebar />
      </div>
      <div className="adminContent">
        <CContainer fluid>
          <CRow className="mb-3">
            <CCol>
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
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  );
};

export default BlogCreateNewView;
