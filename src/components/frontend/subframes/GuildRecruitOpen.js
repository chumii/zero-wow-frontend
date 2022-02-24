import React from "react";
import { useState, useEffect } from "react";
import { getAllRecruits } from "../../../services/recruitService";
import GuildRecruitSingle from "./GuildRecruitSingle";

const GuildRecruitOpen = () => {
  const [recruits, setRecruits] = useState([]);
  useEffect(() => {
    getRecruits();
  }, []);

  const getRecruits = async () => {
    const response = await getAllRecruits();
    setRecruits(response);
    // console.log(response);
  };

  // console.log(recruits);
  return (
    <div>
      <p>
        Für unseren Mythic Raidkader sind wir zur Zeit hauptsächlich auf der
        Suche nach folgenden Klassen:
      </p>
      <div className="recruitListContainer">
        {recruits.map((classSingle) => {
          // if (classSingle.isActive) {
          return (
            <GuildRecruitSingle classObj={classSingle} key={classSingle._id} />
          );
          // } else return null;
        })}
      </div>
    </div>
  );
};

export default GuildRecruitOpen;
