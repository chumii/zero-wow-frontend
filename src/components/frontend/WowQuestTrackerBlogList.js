import React from "react";
// import { useState } from "react";
// import { CProgress, CProgressBar } from "@coreui/react";
// import { capitalize } from "../../services/generalService";
// import ReactMarkdown from "react-markdown";
// import WowFrameBlogPost from "./WowFrameBlogPost";
import { FaSkull } from "react-icons/fa";
import { MdNotes } from "react-icons/md";

const WowQuestTrackerBlogList = (props) => {
  const post = props.post;
  const date = new Date(post.postedAt);
  const formatDate = new Intl.DateTimeFormat("de-DE").format(date);
  // const [isVisible, setIsVisible] = useState(false);
  // console.log(post);

  // const openBlogPost = () => {
  //   if (isVisible) {
  //     setIsVisible(false);
  //   } else {
  //     setIsVisible(true);
  //   }
  // };

  const handleOnclick = () => {
    props.onBlogPostClick(post);
  };

  return (
    <div>
      {/* {isVisible && <WowFrameBlogPost post={post} />} */}

      <div className="WowQuestTrackerBlogList">
        {post.postType === "blogpost" ? (
          <div className="WowQuestTrackerBlogListItem">
            <div className="WowQuestTrackerBlogListItemHeader">
              <div
                className="QuestTrackerBlogListItemTitle"
                onClick={handleOnclick}
              >
                <MdNotes />
                {post.title}
              </div>
              <div className="QuestTrackerBlogListItemDate">{formatDate}</div>
            </div>
            <div className="QuestTrackerBlogListItemContent">
              {/* <ReactMarkdown>{post.content}</ReactMarkdown> */}
            </div>
          </div>
        ) : (
          <div className="WowQuestTrackerBlogListItem">
            <div className="WowQuestTrackerBlogListItemHeader">
              <div
                className="QuestTrackerBlogListItemTitle"
                onClick={handleOnclick}
              >
                <FaSkull />
                {post.title}
              </div>
              <div className="QuestTrackerBlogListItemDate">{formatDate}</div>
            </div>

            <div className="QuestTrackerBlogListItemContent">
              {/* <ReactMarkdown>{post.content}</ReactMarkdown> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WowQuestTrackerBlogList;
