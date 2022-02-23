import { CCol, CContainer, CRow, CFormSelect } from "@coreui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../../components/dashboard/Sidebar";
import SetupPlayerRow from "../../components/dashboard/setup/SetupPlayerRow";
import { getAllRaids } from "../../services/raidsService";
import { getBossesOfRaid } from "../../services/bosskillService";
import { capitalize } from "../../services/generalService";
import { getAllMember } from "../../services/memberService";
import {
  saveSetup,
  // getAllSetups,
  // getLatestSetup,
} from "../../services/setupService";
// import { getAllBlogPosts } from "../../services/blogService";
// import BlogListItem from "../../components/dashboard/blog/BlogListItem";
// import { capitalize } from "../../services/generalService";

import "./Dashboard.scss";
import "./NewSetup.scss";
var mongoose = require("mongoose");
/*

*/

const CreateSetupView = () => {
  const [raidSlug, setRaidSlug] = useState("");
  const [bosses, setBosses] = useState([]);
  const navigate = useNavigate();
  //eslint-disable-next-line
  const [_id, setId] = useState(null);
  const [raids, setRaids] = useState([]);
  const [bossesOfRaid, setBossesOfRaid] = useState([]);
  //eslint-disable-next-line
  const [bossSlug, setBossSlug] = useState("");
  const [roster, setRoster] = useState([]);
  //eslint-disable-next-line
  const [setup, setSetup] = useState([]);
  // const [gridStyle, setGridStyle] = useState({});
  // const [playersIn, setPlayersIn] = useState([]);

  let myId = mongoose.Types.ObjectId();
  useEffect(() => {
    getAllRaids(setRaids);
    getRoster();
    // buildSetupTemplate();
    // getAllSetups(setBosses, setId);
    // getAllSetups();
  }, []);

  const handleRaidSlugSelect = async (event) => {
    setRaidSlug(event.target.value);
    getBossesOfRaidSelected(event.target.value);
  };

  const getBossesOfRaidSelected = async (raid) => {
    const response = await getBossesOfRaid(raid);
    const bosses = await response.data;

    setBossesOfRaid(bosses);
  };
  // console.log(roster);
  const handleDBSave = async () => {
    // console.log(bosses);
    let defaultBosses = [];
    for (let p = 0; p < bossesOfRaid.length; p++) {
      let defaultRoster = [];
      for (const player of roster) {
        defaultRoster.push({ name: player.name, status: "In" });
      }
      defaultBosses.push({
        name: bossesOfRaid[p].boss_slug,
        boss_slug: bossesOfRaid[p].boss_slug,
        roster: defaultRoster,
      });
    }

    // console.log(defaultBosses);

    for (let i = 0; i < bosses.length; i++) {
      for (let j = 0; j < defaultBosses.length; j++) {
        if (defaultBosses[j].boss_slug === bosses[i].boss_slug) {
          for (const { name, status } of bosses[i].roster) {
            // for (let t = 0; t < defaultBosses.length; t++) {
            for (const entry of defaultBosses[j].roster) {
              if (entry.name === name) {
                entry.status = status;
                break;
              }
            }
            // }
          }
        }
      }
    }

    // console.log(defaultBosses);

    await saveSetup({
      _id: myId,
      raid_slug: raidSlug,
      // bosses,
      bosses: defaultBosses,
    });

    // const newId = async () => {
    //   const id = await getLatestSetup();
    //   setId(id);
    // };
    // const newId = getLatestSetup();
  };

  const handleSubmit = async () => {
    await handleDBSave();
    navigate(`/dashboard/editsetup/${myId}`);
  };

  async function getRoster() {
    const response = await getAllMember();
    const memberData = await response.data;
    const sortedRoster = memberData.sort((a, b) =>
      a.profile.class.localeCompare(b.profile.class)
    );

    let activeRoster = [];
    for (let roster of sortedRoster) {
      if (roster.isActive) {
        activeRoster.push(roster);
      }
    }
    setRoster(activeRoster);
    // console.log(activeRoster);
  }
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `8rem repeat(${bossesOfRaid.length}, 1fr)`,
  };
  // setGridStyle({ style });
  // console.log(style);
  return (
    <div className="adminContainer">
      <div className="adminSidebar">
        <DashboardSidebar />
      </div>
      <div className="adminContent">
        <CContainer>
          <CRow>
            <CCol md="auto">
              <CFormSelect
                aria-label="Raid Slug"
                onChange={handleRaidSlugSelect}
              >
                <option>Raid Slug</option>
                {(() => {
                  let list = [];
                  for (let k = 0; k < raids.length; k++) {
                    const slug = raids[k].raid_slug;
                    list.push(
                      <option key={raids[k].raid_slug} value={slug}>
                        {slug}
                      </option>
                    );
                  }
                  return list;
                })()}
              </CFormSelect>
            </CCol>
          </CRow>
          <CContainer className="newSetupContainer">
            <div className="newSetupBossRow" style={gridStyle}>
              {(() => {
                if (bossesOfRaid.length === 0) {
                  return;
                } else {
                  let list = [];
                  list.push(
                    <div className="newSetupBossCol" key="dummy"></div>
                  );
                  for (let i = 0; i < bossesOfRaid.length; i++) {
                    const slug = bossesOfRaid[i].boss_slug;
                    list.push(
                      <div className="newSetupBossCol" key={i}>
                        {/* <div key={bossesOfRaid[i].boss_slug}> */}
                        <div className="newSetupBossName">
                          {capitalize(slug.replace(/-/g, " "))}
                        </div>
                        <img
                          src={`https://cdnassets.raider.io/images/${raidSlug}/bossicons/${slug}.jpg`}
                          alt={slug}
                          key={slug}
                        />

                        {/* </div> */}
                      </div>
                    );
                  }
                  return list;
                }
              })()}
            </div>

            <CRow>
              {(() => {
                if (bossesOfRaid.length === 0) {
                  return;
                } else {
                  let playerList = [];
                  for (let j = 0; j < roster.length; j++) {
                    // console.log(roster[j].name);
                    playerList.push(
                      <SetupPlayerRow
                        key={j}
                        playerClass={roster[j].profile.class}
                        playerName={roster[j].name}
                        playerRealName={roster[j].real_name}
                        bossesOfRaid={bossesOfRaid}
                        setBosses={setBosses}
                        savedBosses={bosses}
                        gridStyle={gridStyle}
                        // setPlayerStatusForAllBosses={
                        //   setPlayerStatusForAllBosses
                        // }
                      />
                    );
                  }
                  return playerList;
                }
              })()}
            </CRow>
            <div className="setupLegende">
              <div>
                <span className="setupPlayerOptionButtonIn legendeLeft"></span>
                <span className="legendeRight"> In</span>
              </div>
              <div>
                <span className="setupPlayerOptionButtonInOff legendeLeft"></span>
                <span className="legendeRight"> In (OffSpec)</span>
              </div>
              <div>
                <span className="setupPlayerOptionButtonInTwink legendeLeft"></span>
                <span className="legendeRight"> In (Twink)</span>
              </div>
              <div>
                <span className="setupPlayerOptionButtonBackup legendeLeft"></span>
                <span className="legendeRight"> Backup</span>
              </div>
              <div>
                <span className="setupPlayerOptionButtonAbg legendeLeft"></span>
                <span className="legendeRight"> Abgemeldet</span>
              </div>
              <div>
                <span className="setupPlayerOptionButtonOut legendeLeft"></span>
                <span className="legendeRight"> Nicht reagiert</span>
              </div>
            </div>
          </CContainer>
        </CContainer>
        <button onClick={() => handleSubmit()}>Save</button>
      </div>
    </div>
  );
};

export default CreateSetupView;
