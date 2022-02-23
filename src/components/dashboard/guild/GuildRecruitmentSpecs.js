import { useState } from "react";
import "./Recruitment.scss";

const GuildRecruitmentSpecs = (props) => {
  const recruitClass = props.recruitClass;
  const spec = props.spec;
  const [isActive, setIsActive] = useState(spec.isActive);
  // let editMode = props.editMode;
  // console.log(spec);
  // console.log(recruitClass);
  const opacityStyle = [
    { opacity: "0.2", cursor: "pointer" },
    { opacity: "1", cursor: "pointer" },
  ];
  // const cursorStyle = { opacity: "0.2", cursor: "pointer" };

  const handleActive = () => {
    if (props.editMode) {
      if (isActive) {
        setIsActive(false);
        spec.isActive = false;
        props.onChange(spec);
      } else {
        setIsActive(true);
        spec.isActive = true;
        props.onChange(spec);
      }
    }
  };

  return (
    <div
      className="singleRecruitSpecContainer"
      style={isActive ? opacityStyle[1] : opacityStyle[0]}
    >
      <img
        src={
          process.env.PUBLIC_URL +
          "/img/spec/" +
          recruitClass +
          "/" +
          spec.spec_name +
          ".png"
        }
        alt="spec"
        onClick={handleActive}
      />
    </div>
  );
};

export default GuildRecruitmentSpecs;
