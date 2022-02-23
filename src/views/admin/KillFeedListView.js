import { CCol, CContainer, CRow } from "@coreui/react";
import { useState, useEffect } from "react";
import DashboardSidebar from "../../components/dashboard/Sidebar";
import { getAllBossKills } from "../../services/bosskillService";
import KillFeedItem from "../../components/dashboard/killfeed/KillFeedItem";
// import { capitalize } from "../../services/generalService";

import "./Dashboard.scss";

const KillFeedListView = () => {
  const [bosskills, setBosskills] = useState([]);
  // console.log(bosskills);
  useEffect(() => {
    getBossKills();
    return () => {
      setBosskills([]);
    };
  }, []);

  async function getBossKills() {
    const response = await getAllBossKills();
    setBosskills(response.data);
  }
  // console.log(blogposts);
  return (
    <div className="adminContainer">
      <div className="adminSidebar">
        <DashboardSidebar />
      </div>
      <div className="adminContent">
        <CContainer>
          <CRow className="mb-3">
            <CCol md="auto" className="killFeedItemListContainer">
              {bosskills.map((kill) => {
                return (
                  <KillFeedItem
                    key={kill._id}
                    kill={kill}
                    onDelete={getBossKills}
                  />
                  // <div key={kill._id}>
                  //   {kill.title} {kill.content}{" "}
                  //   {kill.killdata.kill.defeatedAt}
                  // </div>
                );
                // <BlogListItem
                //   key={post._id}
                //   post={post}
                //   onDelete={getBlogPosts}
                // />
              })}
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  );
};

export default KillFeedListView;
