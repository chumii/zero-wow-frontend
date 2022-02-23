// import { CCol, CContainer, CRow, CFormSelect } from "@coreui/react";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import SetupPlayerRow from "../../components/dashboard/setup/SetupPlayerRow";
// import { getAllRaids } from "../../services/raidsService";
// import { getBossesOfRaid } from "../../services/bosskillService";
// import { capitalize } from "../../services/generalService";
// import { getAllMember } from "../../../../services/memberService";
// import { saveSetup, getSetupById } from "../../services/setupService";
// import { getAllBlogPosts } from "../../services/blogService";
// import BlogListItem from "../../components/dashboard/blog/BlogListItem";
import { capitalize } from "../../../../services/generalService";

import "../../../../views/admin/PrepareSetup.scss";

/*

*/

const SetupPrintBossCol = (props) => {
  // let { id } = useParams();
  // const [roster, setRoster] = useState([]);
  const boss = props.boss;
  const raidSlug = props.raidSlug;
  // const [isShown, setIsShown] = useState(true);
  // console.log(boss);
  // useEffect(() => {
  //   // setRoster(props.roster);
  //   getRoster();
  //   return () => {
  //     setRoster([
  //       {
  //         name: "",
  //         real_name: "",
  //         profile: { name: "", class: "" },
  //       },
  //     ]);
  //   };
  // }, []);
  // console.log(roster);
  // async function getRoster() {
  //   const response = await getAllMember();
  //   const memberData = await response.data;
  //   setRoster(memberData);
  // }

  // const gridStyle = {
  //   display: "grid",
  //   gridTemplateColumns: `8rem repeat(${bosses.length}, 1fr)`,
  // };

  // const toggleIsShown = () => {
  //   if (isShown) {
  //     setIsShown(false);
  //   } else {
  //     setIsShown(true);
  //   }
  // };

  // const displayStyle = [{ display: "block" }, { display: "none" }];

  const handleClick = () => {
    props.handleColVisibility(boss.boss_slug);
  };

  return (
    <div
      className="printSetupBosses"
      // style={isShown ? displayStyle[0] : displayStyle[1]}
    >
      <div className="printSetupBossCol" style={props.colStyle}>
        <div className="printSetupBossName" onClick={handleClick}>
          <div>{capitalize(boss.boss_slug.replace(/-/g, " "))}</div>
          <img
            src={`https://cdnassets.raider.io/images/${raidSlug}/bossicons/${boss.boss_slug}.jpg`}
            alt={boss.boss_slug}
            key={boss.boss_slug}
          />
        </div>

        {boss.roster.map((player) => (
          <div
            key={player._id}
            className={`optionButton setupPlayerOptionButton` + player.status}
          >
            {/* {player.status} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetupPrintBossCol;
