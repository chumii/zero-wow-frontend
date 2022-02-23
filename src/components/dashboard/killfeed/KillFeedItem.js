//KillFeedItem.js
import { useState, useEffect } from "react";
import {
  CButton,
  CModalFooter,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import {
  deleteBossKill,
  // getBossKillById,
} from "../../../services/bosskillService";
import { useNavigate } from "react-router-dom";
import "./KillFeedItem.scss";
// import { capitalize } from "../../../services/generalService";

const KillFeedItem = (props) => {
  let navigate = useNavigate();
  const id = props.kill._id;
  const [visible, setVisible] = useState(false);
  const [defeatedAt, setDefeatedAt] = useState(Date);
  const [roster, setRoster] = useState([]);
  const [killData, setKillData] = useState({});
  const [kill, setKill] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    setKill(props.kill);
    const date = new Date(props.kill.killdata.kill.defeatedAt);
    const formatDate = new Intl.DateTimeFormat("de-DE").format(date);
    setDefeatedAt(formatDate);
    setRoster(props.kill.killdata.roster);
    setKillData(props.kill.killdata.kill);
    return () => {
      setKill({
        title: "",
        content: "",
      });
    };
  }, [props.kill]);

  // useEffect(() => {
  //   getBossKillById(id)
  //     .then((response) => setKill(response.data))
  //     .catch((error) => console.log(error));
  // }, []);

  // console.log(roster);

  const handleDelete = async (event) => {
    event.preventDefault();
    const choice = window.confirm(kill.title + " wirklich löschen?");
    if (!choice) return;
    await deleteBossKill(kill._id);
    props.onDelete();
  };
  // for (let i = 0; i < kill.killdata.roster.length; i++) {
  //   const player = kill.killdata.roster[i];
  //   console.log(player);
  // }
  return (
    <>
      <CModal visible={visible} onClose={() => setVisible(false)} size="xl">
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>
            {kill.title}
            <span className="killfeedDefeatedAt">{defeatedAt}</span>
          </CModalTitle>
        </CModalHeader>
        <CModalBody className="killfeedDetailBody">
          <div className="killfeedDetailRow">
            <span className="killfeedDetailTitle">Boss:</span>
            {kill.boss_slug}
          </div>
          <div className="killfeedDetailRow">
            <span className="killfeedDetailTitle">Difficulty:</span>
            {kill.difficulty}
          </div>
          <div className="killfeedDetailRow killfeedRoster">
            <div>{killData.itemLevelEquippedAvg}</div>
            {(() => {
              let list = [];

              for (let i = 0; i < roster.length; i++) {
                const player = roster[i];
                list.push(
                  <div key={i} className={player.character.class.slug}>
                    {player.character.name}
                  </div>
                );
              }
              return list;
            })()}
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <div className="killFeedItemContainer">
        <div className="titleCol">
          {kill.title}
          <span className="killfeedDefeatedAt">{defeatedAt}</span>
        </div>
        <div className="buttonCol">
          <span className="detailButton">
            <CIcon
              icon={icon.cilMagnifyingGlass}
              size="lg"
              onClick={() => setVisible(!visible)}
            />
          </span>
          <span className="editButton">
            <CIcon
              icon={icon.cilPencil}
              size="lg"
              onClick={() => navigate(`/dashboard/killpostedit/${id}`)}
            />
          </span>
          <span className="deleteButton">
            <CIcon
              icon={icon.cilTrash}
              size="lg"
              color=""
              onClick={handleDelete}
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default KillFeedItem;
