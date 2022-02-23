import { CCol, CContainer, CRow } from "@coreui/react";
import { useState, useEffect } from "react";
import DashboardSidebar from "../../components/dashboard/Sidebar";
import { getAllBlogPosts } from "../../services/blogService";
import BlogListItem from "../../components/dashboard/blog/BlogListItem";
// import { capitalize } from "../../services/generalService";

import "./Dashboard.scss";

const AdminBlogListView = () => {
  const [blogposts, setBlogposts] = useState([]);

  useEffect(() => {
    getBlogPosts();
    return () => {
      setBlogposts([]);
    };
  }, []);

  async function getBlogPosts() {
    const response = await getAllBlogPosts();
    setBlogposts(response.data);
  }
  // console.log(blogposts);
  return (
    <div className="adminContainer">
      <div className="adminSidebar">
        <DashboardSidebar />
      </div>
      <div className="adminContent">
        <CContainer>
          <CRow>
            <CCol md="auto" className="blogListContainer">
              {/* <div className="tableGrid">
                <div className="titleCol">Titel</div>
                <div className="buttonCol"></div> */}
              {blogposts.map((post) => {
                return (
                  <BlogListItem
                    key={post._id}
                    post={post}
                    onDelete={getBlogPosts}
                  />
                );
              })}
              {/* </div> */}
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  );
};

export default AdminBlogListView;
