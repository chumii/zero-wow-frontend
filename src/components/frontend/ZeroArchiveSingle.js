import React from "react";
import { FaSkull } from "react-icons/fa";
import { MdNotes } from "react-icons/md";

const Zeroarchivesingle = (props) => {
  const post = props.post;
  const date = new Date(post.postedAt);
  const formatDate = new Intl.DateTimeFormat("de-DE").format(date);

  const handleOnclick = () => {
    props.onBlogPostClick(post);
  };

  console.log(post);

  return (
    <div>
      {post.postType === "blogpost" ? (
        <div className="archiveSingle" key={post._id}>
          <div className="archiveTitle">
            <MdNotes />
            <span onClick={handleOnclick}>{post.title}</span>
          </div>
          <div className="archiveDate">{formatDate}</div>
        </div>
      ) : (
        <div className="archiveSingle" key={post._id}>
          <div className="archiveTitle">
            <FaSkull />
            <span onClick={handleOnclick}>{post.title}</span>
          </div>
          <div className="archiveDate">{formatDate}</div>
        </div>
      )}
    </div>
  );
};

export default Zeroarchivesingle;
