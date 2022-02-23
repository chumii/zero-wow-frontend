import { CCol, CCard, CCardHeader } from "@coreui/react";
import GuildRecruitmentSingleClass from "./GuildRecruitmentSingleClass";
import {
  getAllRecruits,
  updateRecruit,
} from "../../../services/recruitService";
import { useState, useEffect } from "react";
import "./Recruitment.scss";

const GuildRecruitment = (props) => {
  const [allRecruits, setAllRecruits] = useState([]);
  const [editMode, setEditMode] = useState(false);
  // console.log(allRecruits);
  useEffect(() => {
    getRecruits();
  }, []);

  const getRecruits = async () => {
    const response = await getAllRecruits();
    setAllRecruits(response);
  };

  const handleSave = async (recruitClassNew) => {
    allRecruits.map((recruitClass) => {
      return recruitClass.class_name === recruitClassNew.class_name
        ? (recruitClass = recruitClassNew)
        : recruitClass;
    });
    setAllRecruits(allRecruits);
  };

  const handleEditButton = async () => {
    if (editMode) {
      setEditMode(false);
      allRecruits.forEach(async (recruit) => {
        try {
          await updateRecruit(recruit, recruit._id);
        } catch (error) {
          console.log(error.message);
        }
      });
    } else {
      setEditMode(true);
    }
  };

  // console.log(allRecruits);
  return (
    <CCol>
      <CCard className="dashBoardCard">
        <CCardHeader className="recruitCardHeader">
          <span>Recruitment</span>
          <span>
            <div className="recruitEditButton" onClick={handleEditButton}>
              {editMode ? "Save" : "Edit"}
            </div>
          </span>
        </CCardHeader>
        <div className="recruitmentContainer">
          {allRecruits.map((recruitClass) => {
            return (
              <GuildRecruitmentSingleClass
                recruitClass={recruitClass}
                key={recruitClass._id}
                editMode={editMode}
                onSave={handleSave}
              />
            );
          })}
        </div>
      </CCard>
    </CCol>
  );
};

export default GuildRecruitment;
