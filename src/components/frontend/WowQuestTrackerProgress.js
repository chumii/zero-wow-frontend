import React from "react";
import { CProgress, CProgressBar } from "@coreui/react";
import { capitalize } from "../../services/generalService";

const WowQuestTrackerProgress = (props) => {
  const raid = props.raid;
  const raidName = capitalize(props.raidSlug.replace(/-/g, " "));

  const raidProgress =
    (props.raid.mythic_bosses_killed / props.raid.total_bosses) * 100;
  // console.log(raid);
  return (
    <div className="WowQuestTrackerProgress">
      {/* <div className="questTrackerTitle">{raidName}</div> */}
      <div className="questTrackerTitle">{raidName}</div>
      <div className="questTrackerProgress">
        <div className="questTrackerProgressTitle">
          <div>Töte alle Bosse</div>
          <div>
            {raid.summary.replace(/\//g, " / ")}
            {/* {guild.raid_progression[raidToTrack].mythic_bosses_killed} /{" "}
              {guild.raid_progression[raidToTrack].total_bosses} */}
          </div>
        </div>
        <CProgress height={10}>
          <CProgressBar value={raidProgress} />
        </CProgress>
      </div>
    </div>
  );
};

export default WowQuestTrackerProgress;
