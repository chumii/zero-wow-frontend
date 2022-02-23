// import { useEffect, useState } from "react";
// import { getAllBlogPosts } from "../services/blogService";
// import { getAllBossKills } from "../services/bosskillService";
// import WowFrame from "../components/frontend/WowFrame";
// import ReactMarkdown from "react-markdown";

const WowFrame = (props) => {
  const logoSvg = process.env.PUBLIC_URL + "/img/logo.svg";
  // const blueTabBg = process.env.PUBLIC_URL + "/img/textures/blueTabBg.png";

  return (
    <div className="WowFrame">
      <div className="titleBar">
        <div
          className="logoCircle"
          style={{ backgroundImage: "url(" + logoSvg + ")" }}
        ></div>
        <div className="title innershadowlight">Titel</div>
        <div className="closeBtn" onClick={props.closeBtn}>
          X
        </div>
      </div>
      <div className="contentWrapper innershadowstrong">
        <div
          className="selectionTabsLeft innershadowlight"
          // style={{ backgroundImage: "url(" + blueTabBgBig + ")" }}
        >
          <div
            className="selectionTab"
            // style={{ backgroundImage: "url(" + blueTabBg + ")" }}
          >
            Tab 1
          </div>

          <div
            className="selectionTab"
            // style={{ backgroundImage: "url(" + blueTabBg + ")" }}
          >
            Tab 3
          </div>
        </div>
        <div className="mainContent innershadowlight">
          <p>TEMPLATE</p>
        </div>
      </div>
    </div>
  );
};

export default WowFrame;
