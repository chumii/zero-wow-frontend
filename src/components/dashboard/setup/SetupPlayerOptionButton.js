//BlogListItem.js
import { useState, useEffect } from "react";

const SetupPlayerOptionButton = ({
  boss,
  playerName,
  addStatus,
  selectedPlayer,
}) => {
  const boss_slug = boss.boss_slug;
  const [clickCount, setClickCount] = useState(0);
  //eslint-disable-next-line
  const [playerStatus, setPlayerStatus] = useState("");

  const classes = ["In", "InOff", "InTwink", "Backup", "Abg", "Out"];

  useEffect(() => {
    const savedStatusCount = classes.indexOf(selectedPlayer?.status);
    if (savedStatusCount !== -1 && savedStatusCount < classes.length) {
      setClickCount(savedStatusCount);
    }

    // eslint-disable-next-line
  }, [selectedPlayer]);

  const handleBtnClick = () => {
    if (clickCount + 1 < classes.length) {
      setPlayerStatus(classes[clickCount]);
      addStatus(playerName, classes[clickCount + 1], boss_slug);
      // setPlayerStatus(classes[clickCount]);
      // console.log(clickCount);
      // setClickCount(clickCount + 1);
    } else {
      addStatus(playerName, classes[0], boss_slug);
      // console.log(clickCount);
      // setClickCount(0);
    }
  };

  return (
    <div className="setupPlayerOptionButton">
      <div
        className={`optionButton setupPlayerOptionButton` + classes[clickCount]}
        onClick={handleBtnClick}
      ></div>
    </div>
  );
};

export default SetupPlayerOptionButton;

// Kadergröße, Avg Ilvl, Tanks / Heal / Dps Counter
