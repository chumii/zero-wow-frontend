import { CCol, CContainer, CRow } from "@coreui/react";
import { useState, useEffect } from "react";
import DashboardSidebar from "../../components/dashboard/Sidebar";
import { getAllSetups } from "../../services/setupService";
import SetupListItem from "../../components/dashboard/setup/SetupListItem";
// import BlogListItem from "../../components/dashboard/blog/BlogListItem";
// import { capitalize } from "../../services/generalService";

import "./Dashboard.scss";

const SetupListView = () => {
  const [setups, setSetups] = useState([]);

  useEffect(() => {
    getSetups();
    return () => {
      setSetups([]);
    };
  }, []);

  async function getSetups() {
    const response = await getAllSetups();
    setSetups(response);
  }
  // console.log(blogposts);
  return (
    <div className="adminContainer">
      <div className="adminSidebar">
        <DashboardSidebar />
      </div>
      <div className="adminContent">
        <CContainer>
          <CRow>
            <CCol md="auto" className="blogListContainer">
              {setups.reverse().map((setup) => {
                return (
                  <SetupListItem
                    setup={setup}
                    key={setup._id}
                    onDelete={getSetups}
                  />
                );
              })}
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  );
};

export default SetupListView;
