import React from "react";
import WowMenuBarButton from "./WowMenuBarButton";

const WowMenuBar = (props) => {
  const buttons = props.buttons;
  // console.log(buttons);
  return (
    <div className="WowMenuBar">
      {/* <WowMenuBarButton icon="logo.svg" target="zeroInfoFrame" />
      <WowMenuBarButton text="!" />
      <WowMenuBarButton text="?" />
      <WowMenuBarButton text={<FaSearch />} /> */}
      {buttons.map((button) => {
        if (button.icon) {
          return (
            <WowMenuBarButton
              icon={button.icon}
              target={button.name}
              key={button.name}
              toggle={button.toggle}
            />
          );
        } else
          return (
            <WowMenuBarButton
              text={button.text}
              target={button.name}
              key={button.name}
              toggle={button.toggle}
            />
          );
      })}
    </div>
  );
};

export default WowMenuBar;
