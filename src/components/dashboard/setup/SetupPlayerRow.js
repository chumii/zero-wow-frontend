//BlogListItem.js
import { useState, useEffect, memo } from "react";
import { capitalize } from "../../../services/generalService";
import SetupPlayerOptionButton from "./SetupPlayerOptionButton";

const SetupPlayerRow = ({
  playerClass,
  playerName,
  playerRealName,
  bossesOfRaid,
  savedBosses,
  setBosses,
  gridStyle,
}) => {
  // const [playerSetup, setPlayerSetup] = useState([]);

  const addStatus = (name, status, bossSlug) => {
    setBosses((bosses) => {
      let updatedBoss = bosses.find((boss) => boss.boss_slug === bossSlug);

      if (Boolean(updatedBoss)) {
        const playerExists = updatedBoss.roster.some(
          (player) => player.name === name
        );
        if (playerExists) {
          updatedBoss = {
            ...updatedBoss,
            roster: updatedBoss.roster.map((player) =>
              player.name === name ? { name, status } : player
            ),
          };
        } else {
          updatedBoss = {
            ...updatedBoss,
            roster: updatedBoss.roster.concat({ name, status }),
          };
        }
        return bosses.map((boss) =>
          boss.boss_slug === bossSlug ? updatedBoss : boss
        );
      } else {
        return bosses.concat({
          name: bossSlug,
          boss_slug: bossSlug,
          roster: [{ name, status }],
        });
      }
    });

    // }
  };

  return (
    <div className="newSetupPlayerRow" style={gridStyle}>
      <div
        className={`newSetupPlayerCard ${playerClass
          .toLowerCase()
          .replace(/ /g, "")}`}
      >
        {playerRealName}
      </div>
      {(() => {
        let buttonList = [];
        for (let i = 0; i < bossesOfRaid.length; i++) {
          buttonList.push(
            <SetupPlayerOptionButton
              key={i}
              boss={bossesOfRaid[i]}
              playerName={playerName}
              addStatus={addStatus}
              selectedPlayer={savedBosses
                .find((boss) => boss.boss_slug === bossesOfRaid[i].boss_slug)
                ?.roster?.find((player) => player.name === playerName)}
            />
          );
        }
        return buttonList;
      })()}
    </div>
  );
};

export default memo(SetupPlayerRow);

// Kadergröße, Avg Ilvl, Tanks / Heal / Dps Counter
