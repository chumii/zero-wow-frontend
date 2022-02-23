import "./Recruitment.scss";
import GuildRecruitmentSpecs from "./GuildRecruitmentSpecs";

const GuildRecruitmentSingleClass = (props) => {
  let recruitClass = props.recruitClass;
  let editMode = props.editMode;

  const handleActiveChange = (specNew) => {
    // console.log(specNew);
    recruitClass.specs.map((spec) => {
      return spec.spec_name === specNew.spec_name ? (spec = specNew) : spec;
    });
    props.onSave(recruitClass);
  };
  return (
    <div className="singleRecruitContainer">
      <div className={recruitClass.class_name}>
        {recruitClass.class_name_ger}
      </div>
      <div className="singleRecruitSpecContainer">
        {recruitClass.specs.map((spec) => (
          <GuildRecruitmentSpecs
            recruitClass={recruitClass.class_name}
            spec={spec}
            editMode={editMode}
            onChange={handleActiveChange}
            key={spec._id}
          />
        ))}
      </div>
    </div>
  );
};

export default GuildRecruitmentSingleClass;
