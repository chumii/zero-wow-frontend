import { useState } from "react";
import GuildInfo from "./subframes/GuildInfo";
import GuildRecruitInfo from "./subframes/GuildRecruitInfo";
import GuildRecruitOpen from "./subframes/GuildRecruitOpen";
// import Raidkader from "./subframes/Raidkader";
// import { getAllBlogPosts } from "../services/blogService";
// import { getAllBossKills } from "../services/bosskillService";
// import WowFrame from "../components/frontend/WowFrame";
// import ReactMarkdown from "react-markdown";

const ZeroInfoFrame = (props) => {
  const logoSvg = process.env.PUBLIC_URL + "/img/logo.svg";
  const [tabOneVisible, setTabOneVisible] = useState(true);
  const [tabTwoVisible, setTabTwoVisible] = useState(false);
  const [tabThreeVisible, setTabThreeVisible] = useState(false);

  const toggleTabOne = () => {
    setTabOneVisible(true);
    setTabTwoVisible(false);
    setTabThreeVisible(false);
  };

  const toggleTabTwo = () => {
    setTabOneVisible(false);
    setTabTwoVisible(true);
    setTabThreeVisible(false);
  };

  const toggleTabThree = () => {
    setTabOneVisible(false);
    setTabTwoVisible(false);
    setTabThreeVisible(true);
  };

  return (
    <div className="WowFrame">
      <div className="titleBar">
        <div
          className="logoCircle"
          style={{ backgroundImage: "url(" + logoSvg + ")" }}
        ></div>
        <div className="title innershadowlight">Zero</div>
        <div className="closeBtn" onClick={props.closeBtn}>
          X
        </div>
      </div>
      <div className="contentWrapper innershadowstrong">
        <div className="selectionTabsLeft innershadowlight">
          <div className="selectionTab" onClick={toggleTabOne}>
            Die Gilde
          </div>
          <div className="selectionTab" onClick={toggleTabTwo}>
            Recruit
          </div>
          <div className="selectionTab" onClick={toggleTabThree}>
            Wir suchen
          </div>
        </div>
        <div className="mainContent innershadowlight">
          {tabOneVisible && <GuildInfo />}
          {tabTwoVisible && <GuildRecruitInfo />}
          {tabThreeVisible && <GuildRecruitOpen />}
        </div>
      </div>
    </div>
  );
};

export default ZeroInfoFrame;
