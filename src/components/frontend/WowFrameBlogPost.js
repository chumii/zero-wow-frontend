// import { useEffect, useState } from "react";
// import { getAllBlogPosts } from "../services/blogService";
// import { getAllBossKills } from "../services/bosskillService";
// import WowFrame from "../components/frontend/WowFrame";
import ReactMarkdown from "react-markdown";
import { FaWindowClose } from "react-icons/fa";

const WowFrameBlogPost = (props) => {
  const post = props.post;
  const date = new Date(post.postedAt);
  const formatDate = new Intl.DateTimeFormat("de-DE").format(date);
  const logoSvg = process.env.PUBLIC_URL + "/img/logo.svg";
  console.log(post);
  return (
    // <div className="HomeViewBlogPostContainer">
    <div className="WowFrameBlogPost">
      {post.postType === "blogpost" ? (
        <div>
          <div className="titleBar">
            <div className="title">
              {post.title}
              <span className="postedAt">{formatDate}</span>
            </div>
            <div className="closeBtn" onClick={props.closeBtn}>
              <FaWindowClose />
            </div>
          </div>
          <div className="contentWrapper ">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      ) : (
        <div>
          <div className="titleBar">
            <div className="title">
              {post.title}
              <span className="postedAt">{formatDate}</span>
            </div>
            <div className="closeBtn" onClick={props.closeBtn}>
              <FaWindowClose />
            </div>
          </div>
          <div className="contentWrapper ">
            <a href={post.killshot} target="_blank" rel="noopener noreferrer">
              <img src={post.killshot} alt="" />
            </a>
            <div className="killPostRoster">
              {post.killdata.roster.map((player) => (
                <div
                  className={player.character.class.slug}
                  key={player.character.id}
                >
                  <a
                    href={`https://worldofwarcraft.com/de-de/character/eu/aegwynn/${player.character.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={player.character.class.slug}
                  >
                    {player.character.name}
                  </a>
                </div>
              ))}
            </div>
            {/* <ReactMarkdown>{post.content}</ReactMarkdown> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default WowFrameBlogPost;
