import { useEffect, useState } from "react";
// import { getAllBlogPosts } from "../services/blogService";
// import { getAllBossKills } from "../services/bosskillService";
// import WowUnitFramePlayer from "../components/frontend/WowUnitFramePlayer";
// import ReactMarkdown from "react-markdown";
import WowUnitFramePlayer from "./WowUnitFramePlayer";
import WowUnitFrameBoss from "./WowUnitFrameBoss";

const WowUnitFrames = (props) => {
  // const logoSvg = process.env.PUBLIC_URL + "/img/logo.svg";
  // const boss_slug = props.boss_slug;
  const [bossSlug, setBossSlug] = useState(props.boss_slug);
  const [raidSlug, setRaidSlug] = useState(props.raid_slug);

  useEffect(() => {
    getBossSlug();
    //eslint-disable-next-line
  }, []);

  const getBossSlug = () => {
    setBossSlug(props.boss_slug);
    setRaidSlug(props.raid_slug);
  };

  return (
    <div className="WowUnitFrameContainer">
      <WowUnitFramePlayer />
      <WowUnitFrameBoss boss={bossSlug} raid={raidSlug} />
    </div>
  );
};

export default WowUnitFrames;
