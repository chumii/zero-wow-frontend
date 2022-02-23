import React from "react";
import { useState, useEffect } from "react";
import { getGuilds } from "../../services/guildService";
import { getAllRaidsTwo } from "../../services/raidsService";
import { getAllBlogPosts } from "../../services/blogService";
import { getAllBossKills } from "../../services/bosskillService";
import WowQuestTrackerProgress from "./WowQuestTrackerProgress";
import WowQuestTrackerBlogList from "./WowQuestTrackerBlogList";
// import { BiCopyright } from "react-icons/bi";
// import { GiUnicorn } from "react-icons/gi";

const WowQuestTracker = (props) => {
  const [guild, setGuild] = useState({});
  const [raids, setRaids] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  // const raidToTrack = "sanctum-of-domination";
  // const raidName = "Sanctum of Domination";
  // const [raidProgress, setRaidProgress] = useState(0);

  useEffect(() => {
    getAllGuild();
    collectAllPosts();
  }, []);

  async function getAllGuild() {
    const response = await getGuilds();
    const guildData = await response;
    setGuild(guildData.data[0].guildprofile);
    const raids = await getAllRaidsTwo();
    setRaids(raids);
  }

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

  return (
    <div className="WowQuestTracker">
      {guild.raid_progression &&
        Object.keys(guild.raid_progression).map((raid, i) => {
          if (
            raids.find((singleRaid) => singleRaid.raid_slug === raid)
              ?.active_on_frontpage
          ) {
            return (
              <WowQuestTrackerProgress
                key={i}
                raid={guild.raid_progression[raid]}
                raidSlug={raid}
              />
            );
          } else return null;
        })}
      <div>
        {allPosts.slice(0, 4).map((post) => (
          <WowQuestTrackerBlogList
            post={post}
            key={post._id}
            onBlogPostClick={handleOnClick}
          />
        ))}
      </div>
      <div className="WowQuestTrackerFooter">
        <div className="QuestTrackerFooterLinks">
          <div className="QuestTrackerLink" onClick={props.onArchiveClick}>
            Archiv
          </div>
          <div className="QuestTrackerLink">
            <a
              href="https://raider.io/guilds/eu/aegwynn/Zero"
              target="_blank"
              rel="noreferrer"
            >
              <div className="zeroicofont icon-raiderio"></div>
            </a>
          </div>
          <div className="QuestTrackerLink">
            <a
              href="https://worldofwarcraft.com/de-de/guild/eu/aegwynn/zero"
              target="_blank"
              rel="noreferrer"
            >
              <div className="zeroicofont icon-wow"></div>
            </a>
          </div>
          <div className="QuestTrackerLink">
            <a
              href="https://www.warcraftlogs.com/guild/eu/aegwynn/Zero"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"></path>
              </svg>
            </a>
          </div>
        </div>
        {/* <div className="QuestTrackerFooterCopyright">
          <GiUnicorn /> Zero 2022
        </div> */}
      </div>
    </div>
  );
};

export default WowQuestTracker;
