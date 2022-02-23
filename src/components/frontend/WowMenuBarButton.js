import React from "react";

const WowMenuBarButton = (props) => {
  let icon_url;
  let content;
  if (props.icon) {
    icon_url = process.env.PUBLIC_URL + "/img/" + props.icon;
  }
  if (props.text) {
    content = props.text;
  }
  return (
    <div
      className="WowMenuBarButton"
      style={{ backgroundImage: "url(" + icon_url + ")" }}
      onClick={props.toggle}
    >
      {content}
    </div>
  );
};

export default WowMenuBarButton;
