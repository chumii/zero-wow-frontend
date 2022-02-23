//BlogListItem.js
import { useState, useEffect } from "react";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { CFormSwitch, CSpinner, CAlert } from "@coreui/react";
import {
  deleteMember,
  updateMember,
  // getMemberById,
  getMemberProfileFromRaiderIo,
} from "../../../services/memberService";
// import { useNavigate } from "react-router-dom";
import { concatLowerString } from "../../../services/generalService";
import { FaUndo, FaTrashAlt } from "react-icons/fa";
import "./MemberCard.scss";

const SingleMember = (props) => {
  const profile = props.member.profile;
  // const [member, setMember] = useState({});
  const [gearSet, setGearSet] = useState([]);
  const [isActive, setIsActive] = useState(props.member.isActive);
  const [crawledAt, setCrawledAt] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);

  useEffect(() => {
    setGearSet(profile.gear.items);
    const date = new Date(props.member.profile.last_crawled_at);
    const formatDate = new Intl.DateTimeFormat("de-DE").format(date);
    setCrawledAt(formatDate);
    createItemBonusIdString();
    createItemGemString();
  }, []);

  const createItemBonusIdString = () => {
    for (const key in profile.gear.items) {
      let bonusIdString = "";
      for (let i = 0; i < profile.gear.items[key].bonuses.length; i++) {
        const bonusId = profile.gear.items[key].bonuses[i];
        bonusIdString = bonusIdString + ":" + bonusId;
      }
      profile.gear.items[key].bonusIdString = bonusIdString;
    }
  };

  const createItemGemString = () => {
    for (const key in profile.gear.items) {
      let bonusIdString = "";
      for (let i = 0; i < profile.gear.items[key].gems.length; i++) {
        const bonusId = profile.gear.items[key].gems[i];
        bonusIdString = bonusIdString + ":" + bonusId;
      }
      profile.gear.items[key].gemsString = bonusIdString;
    }
  };

  const handleActiveCheckbox = async (event) => {
    setIsActive(event.target.checked);
    const response = await updateMember(props.member._id, {
      isActive: event.target.checked,
    });
    props.onDelete();
  };

  const handleRioUpdate = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setErrorVisible(false);
    const getNewDataResponse = await getMemberProfileFromRaiderIo(
      props.member.name
    );
    const newData = await getNewDataResponse;
    if (props.member.fix_main_role === newData.active_spec_role) {
      if (JSON.stringify(profile) === JSON.stringify(newData)) {
        setIsLoading(false);
        setErrorMessage("Keine neuen Daten");
        setErrorVisible(true);
        setTimeout(() => {
          setErrorVisible(false);
          props.onDelete();
        }, 3000);
        return;
      } else {
        const response = await updateMember(props.member._id, {
          profile: newData,
        });
        setSuccessMessage("Update erfolgreich");
        setSuccessVisible(true);
        setTimeout(() => {
          setSuccessVisible(false);
          props.onDelete();
        }, 3000);
      }
    } else {
      setIsLoading(false);
      setErrorMessage("Falsche Rolle");
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
        props.onDelete();
      }, 3000);

      return;
    }
    setIsLoading(false);
    // const response = await updateMember(props.member._id);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const choice = window.confirm(profile.name + " wirklich löschen?");
    if (!choice) return;
    await deleteMember(props.member._id);
    props.onDelete();
  };
  // console.log(member);
  return (
    <div>
      <div className="charmembercardContainer">
        <div className="charname">
          <div className={concatLowerString(profile.class)}>{profile.name}</div>
          <div className="realName">{props.member.real_name}</div>
        </div>
        <div className="charspecCov">
          <div className="charclass">
            <img
              src={
                process.env.PUBLIC_URL +
                "/img/class/" +
                concatLowerString(profile.class) +
                "2.png"
              }
              alt="spec"
            />
          </div>
          <div className="charspec">
            <img
              src={
                process.env.PUBLIC_URL +
                "/img/spec/" +
                concatLowerString(profile.class) +
                "/" +
                concatLowerString(profile.active_spec_name) +
                ".png"
              }
              alt="spec"
            />
          </div>
          <div className="charcov">
            <img
              src={
                "https://cdnassets.raider.io/images/sl/covenants/sigil_" +
                profile.covenant.id +
                ".png"
              }
              alt="spec"
            />
          </div>
          <div className="charRenown">{profile.covenant.renown_level}</div>
          <div className="charilvl">{profile.gear.item_level_equipped}</div>
        </div>
        <div className="chargearContainer">
          {(() => {
            let list = [];
            for (const key in gearSet) {
              const name = key.replace(/-/g, " ");
              if (key !== "shirt" && key !== "tabard") {
                list.push(
                  <span key={gearSet[key].item_id}>
                    <a
                      href={
                        "https://www.wowhead.com/item=" +
                        gearSet[key].item_id +
                        "&bonus=" +
                        gearSet[key].bonusIdString +
                        "&gems=" +
                        gearSet[key].gemsString
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={
                          "https://wow.zamimg.com/images/wow/icons/large/" +
                          gearSet[key].icon +
                          ".jpg"
                        }
                        alt={key}
                      />
                    </a>
                  </span>
                );
              }
            }
            return list;
          })()}
        </div>
        <div className="charbuttonContainer">
          {errorVisible && (
            <span className="charErrorMessage">{errorMessage}</span>
          )}
          {successVisible && (
            <span className="charSuccessMessage">{successMessage}</span>
          )}
          <span className="lastCrawled">{crawledAt}</span>
          <span className="isActive">
            <CFormSwitch
              id={props.member._id}
              defaultChecked={isActive}
              name="isActive"
              onChange={handleActiveCheckbox}
            />
          </span>
          <span className="ico charUpdateButton">
            {!isLoading ? (
              <FaUndo onClick={handleRioUpdate} />
            ) : (
              // <CIcon
              //   icon={icon.cilReload}
              //   size="xl"
              //   color=""
              //   onClick={handleRioUpdate}
              // />
              <CSpinner component="span" size="sm" aria-hidden="true" />
            )}
          </span>
          <span className="ico charDeleteButton">
            <FaTrashAlt onClick={handleDelete} />
            {/* <CIcon
              icon={icon.cilTrash}
              size="xl"
              color=""
              onClick={handleDelete}
            /> */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleMember;

// Kadergröße, Avg Ilvl, Tanks / Heal / Dps Counter
