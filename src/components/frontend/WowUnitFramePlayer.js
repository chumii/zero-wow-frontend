import { useEffect, useState } from "react";
// import { getAllBlogPosts } from "../services/blogService";
// import { getAllBossKills } from "../services/bosskillService";
// import WowUnitFramePlayer from "../components/frontend/WowUnitFramePlayer";
// import ReactMarkdown from "react-markdown";

const WowUnitFramePlayer = () => {
  const logoSvg = process.env.PUBLIC_URL + "/img/logo.svg";

  return (
    <div className="WowUnitFramePlayer">
      <div
        className="logoCircle"
        style={{ backgroundImage: "url(" + logoSvg + ")" }}
      ></div>
      <div className="bars">
        <div className="nameBar">Zero</div>
        <div className="healthBar">100%</div>
      </div>
    </div>
  );
};

export default WowUnitFramePlayer;
