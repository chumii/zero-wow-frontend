import {
  CCol,
  CContainer,
  CRow,
  CForm,
  CFormInput,
  CButton,
  CInputGroup,
  CAlert,
  CSpinner,
  CFormSelect,
  // CHeader,
  // CHeaderBrand,
} from "@coreui/react";
import { useState, useEffect } from "react";
import DashboardSidebar from "../../components/dashboard/Sidebar";
import { getAllMember, createNewMember } from "../../services/memberService";
// import { dynamicSort } from "../../services/generalService";
import SingleMember from "../../components/dashboard/roster/SingleMember";
// import { useNavigate } from "react-router";

import "./Dashboard.scss";

const RosterView = () => {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [roster, setRoster] = useState([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberFixMainSpec, setNewMemberFixMainSpec] = useState("");
  const [newMemberRealName, setNewMemberRealName] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [avgIlvlActive, setAvgIlvlActive] = useState(0);
  const [avgIlvlInactive, setAvgIlvlInactive] = useState(0);
  const [activeRoster, setActiveRoster] = useState(0);
  const [inactiveRoster, setInactiveRoster] = useState(0);

  useEffect(() => {
    getRoster();
    setErrorVisible(false);
    return () => {
      setRoster([]);
      setNewMemberName("");
      setErrorVisible(false);
    };
  }, []);

  async function getRoster() {
    const response = await getAllMember();
    const memberData = await response.data;
    // const sortedRoster = memberData;
    const sortedRoster = memberData.sort((a, b) =>
      a.profile.class.localeCompare(b.profile.class)
    );
    // console.log(sortedRoster);
    setRoster(sortedRoster);
    let raidIlvlActive = 0;
    let raidIlvlInactive = 0;
    let activeCount = 0;
    let inactiveCount = 0;
    // console.log(sortedRoster);
    for (const i in sortedRoster) {
      if (sortedRoster[i].isActive) {
        const ilvl = sortedRoster[i].profile.gear.item_level_equipped;
        raidIlvlActive = raidIlvlActive + ilvl;
        activeCount = activeCount + +1;
      } else {
        const ilvl = sortedRoster[i].profile.gear.item_level_equipped;
        raidIlvlInactive = raidIlvlInactive + ilvl;
        inactiveCount = inactiveCount + 1;
      }
      // console.log(raidIlvl);
    }
    const avgRaidIlvlActive = (raidIlvlActive / activeCount).toFixed(2);
    const avgRaidIlvlInactive = (raidIlvlInactive / inactiveCount).toFixed(2);

    setAvgIlvlActive(avgRaidIlvlActive);
    setActiveRoster(activeCount);
    setAvgIlvlInactive(avgRaidIlvlInactive);
    setInactiveRoster(inactiveCount);
  }

  const handleNameChange = (event) => {
    setNewMemberName(event.target.value);
  };

  const handleRealNameChange = (event) => {
    setNewMemberRealName(event.target.value);
  };

  const handleSpecChange = (event) => {
    setNewMemberFixMainSpec(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newMemberName === "") {
      setErrorVisible(true);
      return;
    }
    if (newMemberRealName === "") {
      setErrorVisible(true);
      return;
    }
    setIsLoading(true);
    const response = await createNewMember(
      newMemberName,
      newMemberFixMainSpec,
      newMemberRealName
    );
    getRoster();
    setNewMemberName("");
    if (errorVisible) {
      setErrorVisible(false);
    }
    setIsLoading(false);
    return response;
  };

  // console.log(roster);
  return (
    <div className="adminContainer">
      <div className="adminSidebar">
        <DashboardSidebar />
      </div>
      <div className="adminContent">
        <CContainer>
          <CRow>
            <CCol md="auto">
              <CForm>
                {errorVisible && (
                  <div>
                    <CAlert color="warning">Name eingeben!</CAlert>
                  </div>
                )}
                <CInputGroup className="mb-3">
                  <CFormInput
                    onChange={handleNameChange}
                    value={newMemberName}
                    name="newMemberName"
                    className="form-control"
                    placeholder="Name"
                    type="text"
                    required
                  />
                  <CFormSelect
                    aria-label="Difficulty"
                    onChange={handleSpecChange}
                  >
                    <option>Main Role</option>
                    <option value="TANK">Tank</option>
                    <option value="HEALING">Heiler</option>
                    <option value="DPS">Dps</option>
                  </CFormSelect>
                  <CFormInput
                    onChange={handleRealNameChange}
                    value={newMemberRealName}
                    name="newMemberRealName"
                    className="form-control"
                    placeholder="Real Name"
                    type="text"
                    required
                  />
                  {!isLoading ? (
                    <CButton
                      type="submit"
                      color="secondary"
                      variant="outline"
                      onClick={handleSubmit}
                    >
                      +
                    </CButton>
                  ) : (
                    <CButton disabled color="secondary">
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                    </CButton>
                  )}
                </CInputGroup>
              </CForm>
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol>
              <div className="rosterSummary">
                <div className="rosterCount">{activeRoster}</div>

                <div className="rosterAvgIlvl">{avgIlvlActive}</div>
              </div>
              {roster.map((member) => {
                if (member.isActive && member.fix_main_role === "TANK") {
                  return (
                    <SingleMember
                      key={member._id}
                      member={member}
                      onDelete={getRoster}
                    />
                  );
                } else return "";
              })}
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol>
              {roster.map((member) => {
                if (member.isActive && member.fix_main_role === "HEALING") {
                  return (
                    <SingleMember
                      key={member._id}
                      member={member}
                      onDelete={getRoster}
                    />
                  );
                } else return "";
              })}
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol>
              {roster.map((member) => {
                if (member.isActive && member.fix_main_role === "DPS") {
                  return (
                    <SingleMember
                      key={member._id}
                      member={member}
                      onDelete={getRoster}
                    />
                  );
                } else return "";
              })}
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol>
              <div className="dashboardHeader">Inaktiv</div>
              <div className="rosterSummary">
                <div className="rosterCount">{inactiveRoster}</div>

                <div className="rosterAvgIlvl">{avgIlvlInactive}</div>
              </div>

              {roster.map((member) => {
                if (!member.isActive) {
                  return (
                    <SingleMember
                      key={member._id}
                      member={member}
                      onDelete={getRoster}
                    />
                  );
                } else return "";
              })}
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  );
};

export default RosterView;
