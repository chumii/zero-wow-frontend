import { useEffect, useState } from "react";
// import { getAllBlogPosts } from "../services/blogService";
import { getAllBossKills } from "../services/bosskillService";
import ZeroInfoFrame from "../components/frontend/ZeroInfoFrame";
import ZeroRosterFrame from "../components/frontend/ZeroRosterFrame";
import ZeroArchiveFrame from "../components/frontend/ZeroArchiveFrame";
import WowFrame from "../components/frontend/WowFrame";
import WowQuestTracker from "../components/frontend/WowQuestTracker";
import WowUnitFrames from "../components/frontend/WowUnitFrames";
import WowMenuBar from "../components/frontend/WowMenuBar";
import WowFrameBlogPost from "../components/frontend/WowFrameBlogPost";
import { capitalize } from "../services/generalService";
// import { FaArchive } from "react-icons/fa";

// import ReactMarkdown from "react-markdown";
import "./wowui.scss";

const HomeView = () => {
  const [bgUrl, setBgUrl] = useState("");
  const [latestBoss, setLatestBoss] = useState();
  const [latestBossCap, setLatestBossCap] = useState();
  const [latestRaid, setLatestRaid] = useState();
  const [latestBossObj, setLatestBossObj] = useState([]);
  const [latestRaidDefeatedAt, setLatestRaidDefeatedAt] = useState();
  const [latestBossRoster, setLatestBossRoster] = useState([]);
  const [zeroInfoFrameIsShown, setZeroInfoFrameIsShown] = useState(false);
  const [wowFrameIsShown, setWowFrameIsShown] = useState(false);
  const [blogPostIsShown, setBlogPostIsShown] = useState(false);
  const [blogPost, setBlogPost] = useState({});
  const [zeroRosterFrameIsShown, setZeroRosterFrameIsShown] = useState(false);
  const [zeroArchiveFrameIsShown, setZeroArchiveFrameIsShown] = useState(false);

  useEffect(() => {
    getLatestKillInfo();
  }, []);

  async function getLatestKillInfo() {
    try {
      const killResponse = await getAllBossKills();
      const killResponseData = await killResponse.data;
      setLatestBossObj(killResponseData[killResponseData.length - 1]);
      setLatestBossRoster(
        killResponseData[killResponseData.length - 1].killdata.roster
      );
      setBgUrl(killResponseData[killResponseData.length - 1].killshot);
      setLatestBoss(killResponseData[killResponseData.length - 1].boss_slug);
      const date = new Date(
        killResponseData[killResponseData.length - 1].killdata.kill.defeatedAt
      );
      const formatDate = new Intl.DateTimeFormat("de-DE").format(date);
      setLatestRaidDefeatedAt(formatDate);
      setLatestBossCap(
        capitalize(
          killResponseData[killResponseData.length - 1].boss_slug.replace(
            /-/g,
            " "
          )
        )
      );
      setLatestRaid(killResponseData[killResponseData.length - 1].raid_slug);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleZeroInfoFrameToggle = () => {
    setWowFrameIsShown(false);
    setBlogPostIsShown(false);
    setZeroRosterFrameIsShown(false);
    setZeroArchiveFrameIsShown(false);
    if (zeroInfoFrameIsShown) {
      setZeroInfoFrameIsShown(false);
    } else {
      setZeroInfoFrameIsShown(true);
    }
  };
  const handleWowFrameToggle = () => {
    setZeroInfoFrameIsShown(false);
    setBlogPostIsShown(false);
    setZeroRosterFrameIsShown(false);
    setZeroArchiveFrameIsShown(false);
    if (wowFrameIsShown) {
      setWowFrameIsShown(false);
    } else {
      setWowFrameIsShown(true);
    }
  };

  const handleZeroRosterFrameToggle = () => {
    setZeroInfoFrameIsShown(false);
    setBlogPostIsShown(false);
    setWowFrameIsShown(false);
    setZeroArchiveFrameIsShown(false);
    if (zeroRosterFrameIsShown) {
      setZeroRosterFrameIsShown(false);
    } else {
      setZeroRosterFrameIsShown(true);
    }
  };

  const handleZeroArchiveFrameToggle = () => {
    setZeroInfoFrameIsShown(false);
    setBlogPostIsShown(false);
    setWowFrameIsShown(false);
    setZeroRosterFrameIsShown(false);
    if (zeroArchiveFrameIsShown) {
      setZeroArchiveFrameIsShown(false);
    } else {
      setZeroArchiveFrameIsShown(true);
    }
  };

  const handleBlogPostClick = (post) => {
    setBlogPost(post);
    setWowFrameIsShown(false);
    setZeroInfoFrameIsShown(false);
    setZeroRosterFrameIsShown(false);
    setZeroArchiveFrameIsShown(false);
    setBlogPostIsShown(true);
  };

  const handleArchiveClick = () => {
    setWowFrameIsShown(false);
    setZeroInfoFrameIsShown(false);
    setZeroRosterFrameIsShown(false);
    setBlogPostIsShown(false);
    setZeroArchiveFrameIsShown(true);
  };

  const handleBlogPostFrameToggle = () => {
    setWowFrameIsShown(false);
    setZeroInfoFrameIsShown(false);
    if (blogPostIsShown) {
      setBlogPostIsShown(false);
    } else {
      setBlogPostIsShown(true);
    }
  };

  const frames = [
    {
      name: "zeroRoster",
      icon: "logo.svg",
      toggle: handleZeroRosterFrameToggle,
    },
    // { name: "wowFrame", text: "!", toggle: handleWowFrameToggle },
    // {
    //   name: "wowFrame2",
    //   text: <FaArchive />,
    //   toggle: handleWowFrameToggle,
    // },
    {
      name: "zeroInfo",
      text: "?",
      toggle: handleZeroInfoFrameToggle,
    },
    // { name: "wowFrameQuestion", text: "?" },
  ];

  const bgImageStyle = {
    backgroundImage: "url(" + bgUrl + ")",
  };

  // console.log(latestBossRoster);

  return (
    <div>
      <div className="WowRaidFrames">
        {latestBossRoster.map((player) => {
          if (player.character.spec.role === "tank") {
            return (
              <div
                className={`WowRaidFrameSingle Bg${player.character.class.slug}`}
                key={player.character.id}
              >
                <div>{player.character.name}</div>

                <div
                  className={`zeroicofont icon-${player.character.spec.role}icon`}
                ></div>
              </div>
            );
          } else return null;
        })}
        {latestBossRoster.map((player) => {
          if (player.character.spec.role === "healer") {
            return (
              <div
                className={`WowRaidFrameSingle Bg${player.character.class.slug}`}
                key={player.character.id}
              >
                <div>{player.character.name}</div>

                <div
                  className={`zeroicofont icon-${player.character.spec.role}icon`}
                ></div>
              </div>
            );
          } else return null;
        })}
        {latestBossRoster.map((player) => {
          if (player.character.spec.role === "dps") {
            return (
              <div
                className={`WowRaidFrameSingle Bg${player.character.class.slug}`}
                key={player.character.id}
              >
                <div>{player.character.name}</div>

                <div
                  className={`zeroicofont icon-${player.character.spec.role}icon`}
                ></div>
              </div>
            );
          } else return null;
        })}

        {/* {latestBossRoster.map((player) => (
          <div
            className={`WowRaidFrameSingle Bg${player.character.class.slug}`}
            key={player.character.id}
          >
            <div>{player.character.name}</div>

            <div
              className={`zeroicofont icon-${player.character.spec.role}icon`}
            ></div>
          </div>
        ))} */}
      </div>
      <div className="achievementContainer">
        <div
          className="achievement"
          style={{
            backgroundImage:
              "url(" + process.env.PUBLIC_URL + "/img/achievement_bg2.png)",
          }}
        >
          <div
            className="achievementBossAvatar"
            style={{
              backgroundImage: `url(https://cdnassets.raider.io/images/${latestRaid}/bossicons/${latestBoss}.jpg`,
            }}
          >
            <img
              src={process.env.PUBLIC_URL + "/img/achievement_border.png"}
              alt=""
            />
          </div>
          <div className="achievementBossInfo">
            {/* <div className="achievementDate">{latestRaidDefeatedAt}</div> */}
            <div className="achievementDate"></div>
            <div className="achievementBossName">{latestBossCap}</div>
          </div>
        </div>
      </div>

      <div className="HomeViewContainer" style={bgImageStyle}>
        <div className="HomeViewMain">
          <div>
            {blogPostIsShown && (
              <WowFrameBlogPost
                post={blogPost}
                closeBtn={handleBlogPostFrameToggle}
              />
            )}
            {zeroInfoFrameIsShown && (
              <ZeroInfoFrame closeBtn={handleZeroInfoFrameToggle} />
            )}
            {wowFrameIsShown && <WowFrame closeBtn={handleWowFrameToggle} />}
            {zeroRosterFrameIsShown && (
              <ZeroRosterFrame closeBtn={handleZeroRosterFrameToggle} />
            )}
            {zeroArchiveFrameIsShown && (
              <ZeroArchiveFrame
                closeBtn={handleZeroArchiveFrameToggle}
                onBlogPostClick={handleBlogPostClick}
              />
            )}
          </div>
          <WowQuestTracker
            onBlogPostClick={handleBlogPostClick}
            onArchiveClick={handleArchiveClick}
          />
        </div>
        <div className="HomeViewUnitFrames">
          {latestBoss && latestRaid && (
            <WowUnitFrames boss_slug={latestBoss} raid_slug={latestRaid} />
          )}
          <WowMenuBar buttons={frames} />
        </div>
      </div>
    </div>
  );
};

export default HomeView;
