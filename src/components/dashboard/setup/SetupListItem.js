//BlogListItem.js
import { useState, useEffect } from "react";
import { FaDiscord, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteSetup } from "../../../services/setupService";
import {
  // getNextDayOfWeek,
  capitalize,
  wedOrSun,
} from "../../../services/generalService";
import "./SetupListItem.scss";

const SetupListItem = (props) => {
  const setup = props.setup;
  // const testDate = "2022-02-01T17:04:13.025+00:00";
  const date = new Date(setup.postedAt);
  // const date = new Date(testDate);
  const formatDate = new Intl.DateTimeFormat("de-DE").format(date);
  const nextDate = wedOrSun(date);

  useEffect(() => {
    // const date = new Date(setup.postedAt);
    // const formatDate = new Intl.DateTimeFormat("de-DE").format(date);
    // setPostedAt(date);
  }, []);

  const handleDelete = async (event) => {
    event.preventDefault();
    const choice = window.confirm("Setup wirklich löschen?");
    if (!choice) return;
    await deleteSetup(setup._id);
    props.onDelete();
  };

  // console.log(date);
  return (
    <div className="singleSetupItemContainer">
      <div className="singleSetupItemRaidInfo">
        <img
          src={`https://cdnassets.raider.io/images/${setup.raid_slug}/icon.jpg`}
          alt={setup.raid_slug}
        />
        <div>{capitalize(setup.raid_slug.replace(/-/g, " "))}</div>
        {/* <div>
          <a href={`/dashboard/editsetup/${setup._id}`}>Edit</a>
        </div> */}
      </div>
      <div className="singleSetupDateInfo">
        <span className="postedAt">{formatDate}</span>
        <span className="nextDate">
          {nextDate.day} {nextDate.nextDate}
        </span>
      </div>
      <div className="singleSetupButtonContainer">
        <span className="ico singleSetupEditButton">
          <Link to={`/dashboard/editsetup/${setup._id}`}>
            <FaEdit />
          </Link>
          {/* <CIcon
            icon={icon.cilReload}
            size="xl"
            color=""
            // onClick={handleRioUpdate}
          /> */}
        </span>
        <span className="ico singleSetupPrepareButton">
          <Link to={`/dashboard/preparesetup/${setup._id}`}>
            <FaDiscord />
          </Link>
          {/* <CIcon
            icon={icon.cibDiscord}
            size="xl"
            color=""
            // onClick={handleDelete}
          /> */}
        </span>
        <span className="ico singleSetupPrepareButton">
          <FaTrashAlt onClick={handleDelete} />

          {/* <CIcon
            icon={icon.cibDiscord}
            size="xl"
            color=""
            // onClick={handleDelete}
          /> */}
        </span>
      </div>
    </div>
  );
};

export default SetupListItem;

// Kadergröße, Avg Ilvl, Tanks / Heal / Dps Counter
// Attendance
// Recruitment
