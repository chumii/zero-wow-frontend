import {
  CProgress,
  CProgressBar,
  CCol,
  // CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CCardText,
  // CFormCheck,
} from "@coreui/react";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import CIcon from "@coreui/icons-react";
// import * as icon from "@coreui/icons";
// import { getAllRaidsTwo, updateRaid } from "../../../services/raidsService";

const DashboardGuildProgressView = (props) => {
  const progress = props.progress;
  const rank = props.rank;
  // const raidSlug = props.raidSlug;
  // const [isActive, setIsActive] = useState(props.raidObj.active_on_frontpage);
  // const [id, setId] = useState();

  // console.log(props.raidObj);
  // useEffect(() => {
  //   getActiveState(raidSlug);
  // }, []);

  // console.log(props);

  // console.log(props.raidSlug);
  // (kill / total) * 100;
  const bar = (progress.mythic_bosses_killed / progress.total_bosses) * 100;

  // const getActiveState = async (raidSlug) => {
  //   const raids = await getAllRaidsTwo();
  //   const checked = await raids.find((raid) => raid.raid_slug === raidSlug)
  //     .active_on_frontpage;
  //   const id = await raids.find((raid) => raid.raid_slug === raidSlug)._id;
  //   setIsActive(checked);
  //   setId(id);
  // };

  // const handleActiveCheckbox = async (event) => {
  //   setIsActive(event.target.checked);
  //   const response = await updateRaid(props.raidObj._id, {
  //     active_on_frontpage: event.target.checked,
  //   });
  // };

  // console.log(id);

  return (
    <CCol>
      <CCard className="dashBoardCard">
        <CCardHeader className="dashBoardCardHeader">
          <div>
            {props.raid} {progress.summary}
          </div>
          <div>
            {/* <CFormCheck
              id={id}
              defaultChecked={isActive}
              name="isActive"
              onChange={handleActiveCheckbox}

              // id="flexCheckDefault"
              // defaultChecked={activeState}
              // name={raidSlug}
              // onChange={handleChecked(props.raidSlug)}
            /> */}
          </div>
        </CCardHeader>
        <CCardBody>
          <CCardTitle></CCardTitle>
          <CCardText>Realm: {rank}</CCardText>
          <CProgress height={20} className="mb-5">
            <CProgressBar value={bar} />
          </CProgress>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default DashboardGuildProgressView;
