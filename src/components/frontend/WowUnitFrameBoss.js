import { useEffect, useState } from "react";
// import { getAllBlogPosts } from "../services/blogService";
// import { getAllBossKills } from "../services/bosskillService";
// import WowUnitFramePlayer from "../components/frontend/WowUnitFramePlayer";
// import ReactMarkdown from "react-markdown";
import { capitalize } from "../../services/generalService";

const WowUnitFrameBoss = (props) => {
  const logoSvg = process.env.PUBLIC_URL + "/img/logo.svg";
  // const boss_slug = props.boss;
  const [bossSlug, setBossSlug] = useState(props.boss);
  const [raidSlug, setRaidSlug] = useState(props.raid);

  useEffect(() => {
    getBossSlug();
  }, []);

  const getBossSlug = () => {
    setBossSlug(props.boss);
    setRaidSlug(props.raid);
  };
  //
  return (
    <div className="WowUnitFrameBoss">
      <div className="bars">
        <div className="nameBar">{capitalize(bossSlug.replace(/-/g, " "))}</div>
        <div className="healthBar">0%</div>
      </div>
      <div
        className="logoCircle"
        style={{
          backgroundImage: `url(https://cdnassets.raider.io/images/${raidSlug}/bossicons/${bossSlug}.jpg`,
        }}
      ></div>
    </div>
  );
};

export default WowUnitFrameBoss;
