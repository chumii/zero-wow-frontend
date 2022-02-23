//BlogListItem.js
import { useState, useEffect } from "react";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { deleteBlogPost, getBlogPostById } from "../../../services/blogService";
import { useNavigate } from "react-router-dom";

import "./BlogListItem.scss";

const BlogListItem = (props) => {
  // console.log(props.post);
  let navigate = useNavigate();
  const id = props.post._id;
  // const [visible, setVisible] = useState(false);
  const [postedAt, setPostedAt] = useState("");
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    getBlogPostById(id)
      .then((response) => {
        setPost(response.data);
        const date = new Date(response.data.postedAt);
        const formatDate = new Intl.DateTimeFormat("de-DE").format(date);
        setPostedAt(formatDate);
      })
      .catch((error) => console.log(error));
    //eslint-disable-next-line
  }, []);

  const handleDelete = async (event) => {
    event.preventDefault();
    const choice = window.confirm(post.title + " wirklich löschen?");
    if (!choice) return;
    await deleteBlogPost(post._id);
    props.onDelete();
  };

  return (
    <div className="blogListItemContainer">
      <div className="titleCol">{post.title}</div>
      <div className="dateCol">{postedAt}</div>
      <div className="buttonCol">
        <span className="editButton">
          <CIcon
            icon={icon.cilPencil}
            size="lg"
            onClick={() => navigate(`/dashboard/blogpostedit/${id}`)}
          />
        </span>
        <span className="deleteButton">
          <CIcon
            icon={icon.cilTrash}
            size="lg"
            color=""
            onClick={handleDelete}
          />
        </span>
      </div>
    </div>
  );
};

export default BlogListItem;
