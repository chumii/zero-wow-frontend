import { useEffect, useState } from "react";
// import axios from "axios";
// import BookCard from "../components/BookCard";
import { getAllBlogPosts } from "../services/blogService";
import { getAllBossKills } from "../services/bosskillService";
import ReactMarkdown from "react-markdown";

const HomeView = () => {
  // const [blogposts, setBlogposts] = useState([]);
  // const [bossKillPosts, setBossKillPosts] = useState([]);
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
    const allPostsArray = blogResponseData
      .concat(killResponseData)
      .sort(function compare(a, b) {
        var dateA = new Date(a.postedAt);
        var dateB = new Date(b.postedAt);
        return dateA - dateB;
      })
      .reverse();

    setAllPosts(allPostsArray);
  }

  // const sortedPosts = allPosts.sort(function compare(a, b) {
  //   var dateA = new Date(a.postedAt);
  //   var dateB = new Date(b.postedAt);
  //   return dateA - dateB;
  // });
  // console.log(myArray);

  // console.log(allPosts);

  return (
    <div className="container mt-5">
      <h2>Blog View</h2>
      <div className="conatiner">
        <div className="row">
          {allPosts.map((post) =>
            post.postType === "blogpost" ? (
              <div key={post._id}>
                ============= BLOGPOST ===============
                <br />
                {post.title}
                <br />
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            ) : (
              <div key={post._id}>
                ============= KILLPOST ===============
                <br />
                {post.title}
                <br />
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
