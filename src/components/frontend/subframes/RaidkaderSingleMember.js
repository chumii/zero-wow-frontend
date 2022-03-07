import React from "react";
import { useEffect, useState } from "react";
import { concatLowerString } from "../../../services/generalService";
import { FaCrown } from "react-icons/fa";
// import { BiCrown } from "react-icons/bi";

const RaidkaderSingleMember = (props) => {
  const member = props.member;
  const [gearSet, setGearSet] = useState([]);
  const leitung = ["Olympea", "Faithroll", "Cevapchiji", "Nirlendra"];

  useEffect(() => {
    setGearSet(member.profile.gear.items);
    createItemBonusIdString();
    createItemGemString();
    //eslint-disable-next-line
  }, []);
  // console.log(member);

  const createItemBonusIdString = () => {
    for (const key in member.profile.gear.items) {
      let bonusIdString = "";
      for (let i = 0; i < member.profile.gear.items[key].bonuses.length; i++) {
        const bonusId = member.profile.gear.items[key].bonuses[i];
        bonusIdString = bonusIdString + ":" + bonusId;
      }
      member.profile.gear.items[key].bonusIdString = bonusIdString;
    }
  };

  const createItemGemString = () => {
    for (const key in member.profile.gear.items) {
      let bonusIdString = "";
      for (let i = 0; i < member.profile.gear.items[key].gems.length; i++) {
        const bonusId = member.profile.gear.items[key].gems[i];
        bonusIdString = bonusIdString + ":" + bonusId;
      }
      member.profile.gear.items[key].gemsString = bonusIdString;
    }
  };

  // console.log(member);
  // const getCharMedia = () => {
  // let thUrl = member.profile.thumbnail_url.split("avatar");
  // console.log(thUrl.indexOf("avatar"));
  // console.log(thUrl[0] + "main.jpg");
  // };
  // return (
  //   <div className="rosterSingleTwo">
  //     <div
  //       className="wowAvatar"
  //       // style={{ backgroundImage: "url(" + thUrl[0] + "main.jpg)" }}
  //       style={{ backgroundImage: "url(" + member.profile.thumbnail_url + ")" }}
  //     ></div>
  //     <div className="rosterCharInfo">
  //       <div className="rosterCharName">
  //         {leitung.includes(member.name) ? (
  //           <span className="crown">
  //             <BiCrown />{" "}
  //             <span className={concatLowerString(member.profile.class)}>
  //               {member.name}
  //             </span>
  //           </span>
  //         ) : (
  //           <span>{member.name}</span>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div
      // className={"rosterSingle Bg" + concatLowerString(member.profile.class)}
      className="rosterSingle"
    >
      <div className={concatLowerString(member.profile.class)}>
        {leitung.includes(member.name) ? (
          <span className="crown">
            <FaCrown />

            {member.name}
          </span>
        ) : (
          <span>{member.name}</span>
        )}
      </div>
      {/* <div className="rosterSingleName">{member.name}</div> */}
      <div className="rosterSingleClassSpecCov">
        <img
          src={
            process.env.PUBLIC_URL +
            "/img/class/" +
            concatLowerString(member.profile.class) +
            "2.png"
          }
          alt="spec"
        />
        <img
          src={
            process.env.PUBLIC_URL +
            "/img/spec/" +
            concatLowerString(member.profile.class) +
            "/" +
            concatLowerString(member.profile.active_spec_name) +
            ".png"
          }
          alt="spec"
        />
        <img
          src={
            "https://cdnassets.raider.io/images/sl/covenants/sigil_" +
            member.profile.covenant.id +
            ".png"
          }
          alt="spec"
          className="covIcon"
        />
      </div>
      <div className="rosterSingleWowRio">
        <div className="rosterSingleWowRioLink">
          <a href={member.profile.profile_url} target="_blank" rel="noreferrer">
            <div className="zeroicofont icon-raiderio"></div>
          </a>
        </div>
        <div className="rosterSingleWowRioLink">
          <a
            href={`https://worldofwarcraft.com/de-de/character/eu/aegwynn/${member.name}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="zeroicofont icon-wow"></div>
          </a>
        </div>
      </div>
      <div className="rosterSingleGear">
        {(() => {
          let list = [];
          for (const key in gearSet) {
            //eslint-disable-next-line
            const name = key.replace(/-/g, " ");
            if (key !== "shirt" && key !== "tabard") {
              list.push(
                <span key={gearSet[key].item_id}>
                  <a
                    href={
                      "https://de.wowhead.com/item=" +
                      gearSet[key].item_id +
                      "&bonus=" +
                      gearSet[key].bonusIdString +
                      "&gems=" +
                      gearSet[key].gemsString
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={
                        "https://wow.zamimg.com/images/wow/icons/large/" +
                        gearSet[key].icon +
                        ".jpg"
                      }
                      alt={key}
                    />
                  </a>
                </span>
              );
            }
          }
          return list;
        })()}
      </div>
    </div>
  );
};

export default RaidkaderSingleMember;
