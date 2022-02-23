import React from "react";
import { useState } from "react";

function GuildRecruitSingle(props) {
  //eslint-disable-next-line
  const [klasse, setKlasse] = useState(props.classObj);
  const opacityStyle = [{ opacity: "0.3" }, { opacity: "1" }];
  return (
    <div className="RecruitSingleContainer">
      <div className={klasse.class_name}>{klasse.class_name_ger}</div>
      <div className="RecruitSingleSpecs">
        {klasse.specs.map((spec) => {
          return (
            <div
              className="RecruitSingleSpec"
              style={spec.isActive ? opacityStyle[1] : opacityStyle[0]}
              key={spec._id}
            >
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/img/spec/" +
                  klasse.class_name +
                  "/" +
                  spec.spec_name +
                  ".png"
                }
                alt="spec"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GuildRecruitSingle;
