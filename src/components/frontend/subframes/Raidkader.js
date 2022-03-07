import React from "react";
import { useEffect, useState } from "react";
import { getAllMember } from "../../../services/memberService";
import RaidkaderSingleMember from "./RaidkaderSingleMember";

const Raidkader = () => {
  const [roster, setRoster] = useState([]);
  const leitung = ["Olympea", "Faithroll", "Cevapchiji", "Nirlendra"];

  useEffect(() => {
    getRoster();
    return () => {
      setRoster([]);
    };
  }, []);

  async function getRoster() {
    const response = await getAllMember();
    const memberData = await response.data;
    const sortedRoster = memberData.sort((a, b) =>
      a.profile.class.localeCompare(b.profile.class)
    );
    // console.log(sortedRoster);
    setRoster(sortedRoster);
  }

  return (
    <div className="rosterContainer">
      {/* <div className="rosterTitleBar">
        <div className="rosterTitleBarName">Name</div>
        <div className="rosterTitleClassSpecCov">Klasse</div>
        <div className="rosterTitleBarRole">Rolle</div>
      </div>
      {roster.map((member) => {
        if (member.isActive) {
          return <RaidkaderSingleMember key={member._id} member={member} />;
        } else return "";
      })} */}
      {roster.map((member) => {
        if (member.isActive && member.name === "Olympea") {
          return <RaidkaderSingleMember key={member._id} member={member} />;
        } else return null;
      })}
      {roster.map((member) => {
        if (member.isActive && member.name === "Karen") {
          return <RaidkaderSingleMember key={member._id} member={member} />;
        } else return null;
      })}
      {roster.map((member) => {
        if (member.isActive && member.name === "Nirlendra") {
          return <RaidkaderSingleMember key={member._id} member={member} />;
        } else return null;
      })}
      {roster.map((member) => {
        if (member.isActive && member.name === "Cevapchiji") {
          return <RaidkaderSingleMember key={member._id} member={member} />;
        } else return null;
      })}
      <br />
      {roster.map((member) => {
        if (
          member.isActive &&
          member.fix_main_role === "TANK" &&
          !leitung.includes(member.name)
        ) {
          return <RaidkaderSingleMember key={member._id} member={member} />;
        } else return null;
      })}
      <br />
      {roster.map((member) => {
        if (
          member.isActive &&
          member.fix_main_role === "HEALING" &&
          !leitung.includes(member.name)
        ) {
          return <RaidkaderSingleMember key={member._id} member={member} />;
        } else return null;
      })}
      <br />
      {roster.map((member) => {
        if (
          member.isActive &&
          member.fix_main_role === "DPS" &&
          !leitung.includes(member.name)
        ) {
          return <RaidkaderSingleMember key={member._id} member={member} />;
        } else return null;
      })}
    </div>
  );
};

export default Raidkader;
