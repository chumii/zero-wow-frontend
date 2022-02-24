import { useState, useEffect } from "react";
import { getAllBlogPosts } from "../../services/blogService";
import { getAllBossKills } from "../../services/bosskillService";
import ZeroArchiveSingle from "./ZeroArchiveSingle";

const ZeroArchiveFrame = (props) => {
  const logoSvg = process.env.PUBLIC_URL + "/img/logo.svg";
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    collectAllPosts();
  }, []);

  async function collectAllPosts() {
    const blogResponse = await getAllBlogPosts();
    const blogResponseData = await blogResponse.data;
    // setBlogposts(blogResponseData);
    const killResponse = await getAllBossKills();
    const killResponseData = await killResponse.data;
    // setBossKillPosts(killResponseData);
    let allPostsArray = blogResponseData
      .concat(killResponseData)
      .sort(function compare(a, b) {
        var dateA = new Date(a.postedAt);
        var dateB = new Date(b.postedAt);
        return dateA - dateB;
      })
      .reverse();

    setAllPosts(allPostsArray);
  }

  const handleOnClick = (post) => {
    props.onBlogPostClick(post);
  };

  // console.log(allPosts);

  return (
    <div className="WowFrame">
      <div className="titleBar">
        <div
          className="logoCircle"
          style={{ backgroundImage: "url(" + logoSvg + ")" }}
        ></div>
        <div className="title innershadowlight">Archiv</div>
        <div className="closeBtn" onClick={props.closeBtn}>
          X
        </div>
      </div>
      <div className="contentWrapper innershadowstrong">
        <div className="mainContent innershadowlight">
          <div className="archiveContainer">
            {allPosts.map((post) => (
              <ZeroArchiveSingle
                onBlogPostClick={handleOnClick}
                key={post._id}
                post={post}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZeroArchiveFrame;
