import {
  CCol,
  CContainer,
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  // CCardTitle,
  CCardText,
  CSpinner,
} from "@coreui/react";
import { useState, useEffect } from "react";
import DashboardSidebar from "../../components/dashboard/Sidebar";
// import axios from "axios";
import {
  getGuilds,
  updateGuild,
  getGuildProfileFromRio,
} from "../../services/guildService";
import DashboardGuildProgressView from "../../components/dashboard/guild/DashboardGuildProgressView";
import GuildRecruitment from "../../components/dashboard/guild/GuildRecruitment";
import { capitalize } from "../../services/generalService";
// import { getAllRaidsTwo, updateRaid } from "../../services/raidsService";

import "./Dashboard.scss";

const AdminGuildProfilView = () => {
  const [guild, setGuild] = useState([]);
  const [progress, setProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [guildObj, setGuildObj] = useState(null);
  // const [raidInfo, setRaidInfo] = useState([]);
  useEffect(() => {
    getAllGuild();
  }, []);

  async function getAllGuild() {
    const response = await getGuilds();
    // const raids = await getAllRaidsTwo();
    setGuild(response.data[0].guildprofile);
    setProgress(response.data[0].guildprofile.raid_progression);
    setGuildObj(response.data[0]);

    // setRaidInfo(raids);
  }

  const handleGuildUpdate = async (raidSlug) => {
    setIsLoading(true);
    const oldGuild = guildObj;

    // console.log(oldGuild);
    const newGuildProfile = await getGuildProfileFromRio(
      oldGuild.guildprofile.name
    );
    const newGuild = await newGuildProfile;
    //eslint-disable-next-line
    const updatedGuild = await updateGuild(oldGuild._id, {
      guildprofile: newGuild,
    });
    // console.log(updatedGuild);

    setIsLoading(false);
  };

  // async function handleCheckBoxChange(raidSlug) {
  //   const raids = await getAllRaidsTwo();
  //   // console.log(raids);
  // }

  // console.log(raidInfo);

  // console.log(guild);
  // console.log(progress);
  // console.log(keys);
  return (
    <div className="adminContainer">
      <div className="adminSidebar">
        <DashboardSidebar />
      </div>
      <div className="adminContent">
        <CContainer fluid className="dashboardGuildProfileContainer">
          <CRow className="mb-3">
            <CCol>
              <CCard className="dashBoardCard">
                <CCardHeader className="profileHeader">
                  <span>{guild.name}</span>

                  {!isLoading ? (
                    <span
                      onClick={handleGuildUpdate}
                      style={{ cursor: "pointer" }}
                    >
                      Update
                    </span>
                  ) : (
                    // <CIcon
                    //   icon={icon.cilReload}
                    //   size="xl"
                    //   color=""
                    //   onClick={handleRioUpdate}
                    // />
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                  )}
                </CCardHeader>
                <CCardBody>
                  <CCardText>
                    <a
                      href={guild.profile_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Raider.io
                    </a>
                    <br />
                    <a
                      href="http://sheet.zero-wow.de"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Zero Spreadsheet
                    </a>
                    <br />
                    <a
                      href="http://mythictimings.zero-wow.de"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Sanctum Mythic Heal CD Spreadsheet
                    </a>
                  </CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            {/* <CCol>dasdsa</CCol>
            <CCol>dasdsa</CCol>
            <CCol>dasdsa</CCol> */}
          </CRow>
          <CRow>
            {(() => {
              let list = [];
              for (const key in progress) {
                const name = key.replace(/-/g, " ");
                list.push(
                  <DashboardGuildProgressView
                    key={key}
                    // raidObj={raidInfo.find((raid) => raid.raid_slug === key)}
                    progress={progress[key]}
                    raid={capitalize(name)}
                    rank={guild.raid_rankings[key].mythic.realm}
                    // onCheckBoxChange={handleCheckBoxChange}
                  />
                );
              }
              return list;
            })()}
          </CRow>
          <CRow>
            <GuildRecruitment />
          </CRow>
        </CContainer>
      </div>
    </div>
  );
};

export default AdminGuildProfilView;
