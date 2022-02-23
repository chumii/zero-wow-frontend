import {
  CContainer,
  CRow,
  CCol,
  CForm,
  CInputGroup,
  CFormInput,
  CFormSelect,
  CButton,
} from "@coreui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardSidebar from "../../components/dashboard/Sidebar";
import SetupPrintBossCol from "../../components/dashboard/setup/SetupPrint/SetupPrintBossCol";
import SetupPrintBossInactiveCol from "../../components/dashboard/setup/SetupPrint/SetupPrintBossInactiveCol";
import { getBossesOfRaid } from "../../services/bosskillService";
// import { capitalize, wedOrSun } from "../../services/generalService";

import {
  getSetupById,
  getRosterOfSetupById,
} from "../../services/setupService";
import { getAllMember } from "../../services/memberService";

import "./Dashboard.scss";
import "./NewSetup.scss";
import "./PrepareSetup.scss";

const PrepareSetupView = () => {
  let { id } = useParams();
  const [raidSlug, setRaidSlug] = useState("");
  const [bosses, setBosses] = useState([]);
  const [bossesOfRaid, setBossesOfRaid] = useState([]);
  const [roster, setRoster] = useState([]);
  const [firstBossRoster, setFirstBossRoster] = useState([]);
  // const [isShown, setIsShown] = useState(true);
  const [bossColsVisible, setbossColsVisible] = useState([]);

  useEffect(() => {
    getRoster();
    getSetupById(setBosses, id, setRaidSlug, getBossesOfRaidSelected);
    getFirstBossRoster(id);
    //eslint-disable-next-line
  }, []);

  const initBossColVisible = (arr) => {
    let bossCols = [];
    // console.log(arr);
    arr.forEach((element) => {
      bossCols.push({ boss_slug: element.boss_slug, visible: true });
    });
    // console.log(bossCols);
    setbossColsVisible(bossCols);
  };

  async function getRoster() {
    const response = await getAllMember();
    const memberData = await response.data;
    setRoster(memberData);
  }

  async function getFirstBossRoster(id) {
    const response = await getRosterOfSetupById(id);
    setFirstBossRoster(response);
  }

  const getBossesOfRaidSelected = async (raid) => {
    const response = await getBossesOfRaid(raid);
    const bosses = await response.data;
    initBossColVisible(bosses);
    setBossesOfRaid(bosses);
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `8rem repeat(${bossesOfRaid.length}, 1fr)`,
  };

  const colStyle = {
    display: "grid",
    gridTemplateRows: `8rem repeat(${firstBossRoster.length}, 1.2rem)`,
  };

  const handleColVisibility = (boss_slug) => {
    let copy = bossColsVisible;
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].boss_slug === boss_slug) {
        // console.log("w00p");
        let item = copy[i];
        if (item.visible === true) {
          item.visible = false;
        } else {
          item.visible = true;
        }
        copy[i] = item;
      }
    }
    setbossColsVisible(copy);
    findVisibileState(boss_slug);
    // console.log(bossColsVisible);
    // console.log(findVisibileState(boss_slug));
  };

  const findVisibileState = (boss_slug) => {
    for (let i = 0; i < bossColsVisible.length; i++) {
      if (bossColsVisible[i].boss_slug === boss_slug) {
        // console.log(bossColsVisible[i].visible);
        return bossColsVisible[i].visible;
      }
    }
  };

  // const displayStyle = [{ display: "block" }, { display: "none" }];
  console.log(bosses);
  return (
    <div className="adminContainer">
      <div className="adminSidebar">
        <DashboardSidebar />
      </div>
      <div className="adminContent">
        <CRow>
          <CCol md="auto">
            <CForm>
              <CInputGroup className="mb-3">
                <CFormInput
                  // onChange={handleNameChange}
                  // value={newMemberName}
                  name="newMemberName"
                  className="form-control"
                  placeholder="Screenshot URL"
                  type="text"
                  required
                />
                <CFormSelect
                  aria-label="Difficulty"
                  // onChange={handleSpecChange}
                >
                  <option>Channel</option>
                  <option value="test">Test</option>
                  <option value="announcement">Raid Announcement</option>
                </CFormSelect>
                <CFormInput
                  // onChange={handleRealNameChange}
                  // value={newMemberRealName}
                  name="newMemberRealName"
                  className="form-control"
                  placeholder="Datum"
                  type="text"
                  required
                />

                <CButton
                  type="submit"
                  color="secondary"
                  variant="outline"
                  // onClick={handleSubmit}
                >
                  +
                </CButton>
              </CInputGroup>
            </CForm>
          </CCol>
        </CRow>
        <CContainer className="prepareSetupContainer">
          <CRow>
            <div className="prepareSetupColWrapper" style={gridStyle}>
              <div className="printSetupBosses">
                <div className="printSetupBossCol" style={colStyle}>
                  <div></div>
                  {firstBossRoster.map((player) => (
                    <div
                      className={
                        roster
                          .find((x) => x.name === player.name)
                          ?.profile.class.toLowerCase()
                          .replace(/ /g, "") + " printSetupPlayerName"
                      }
                      key={player._id}
                    >
                      <span>
                        {roster.find((x) => x.name === player.name)?.real_name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {bosses.map((boss) =>
                bossColsVisible.find((x) => x.boss_slug === boss.boss_slug)
                  ?.visible ? (
                  // return findVisibileState(boss.boss_slug) ? (
                  <SetupPrintBossCol
                    boss={boss}
                    raidSlug={raidSlug}
                    key={boss._id}
                    colStyle={colStyle}
                    handleColVisibility={handleColVisibility}
                  />
                ) : (
                  <div key={boss._id}></div>
                )
              )}
            </div>
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
        <CContainer className="prepareSetupContainer">
          <div className="prepareSetupToggleBossWrapper">
            {bosses.map(
              (boss) =>
                bossColsVisible.find((x) => x.boss_slug === boss.boss_slug)
                  ?.visible ? (
                  // <div key={boss._id}></div>
                  <SetupPrintBossInactiveCol
                    boss={boss}
                    raidSlug={raidSlug}
                    key={boss._id}
                    colStyle={colStyle}
                    handleColVisibility={handleColVisibility}
                  />
                ) : (
                  <SetupPrintBossInactiveCol
                    boss={boss}
                    raidSlug={raidSlug}
                    key={boss._id}
                    colStyle={colStyle}
                    handleColVisibility={handleColVisibility}
                  />
                )
              // <div className="printSetupBossName" key={boss._id}>
              //   <div>{capitalize(boss.boss_slug.replace(/-/g, " "))}</div>
              //   <img
              //     src={`https://cdnassets.raider.io/images/${raidSlug}/bossicons/${boss.boss_slug}.jpg`}
              //     alt={boss.boss_slug}
              //     key={boss.boss_slug}
              //     // onClick={toggleIsShown}
              //   />
              // </div>
            )}
          </div>
        </CContainer>
      </div>
    </div>
  );
};

export default PrepareSetupView;
