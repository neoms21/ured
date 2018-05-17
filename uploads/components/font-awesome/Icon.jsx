import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

export default function({ iconName, classNames, regular }) {
  console.log(iconName);
  return (
    <FontAwesomeIcon
      className={`icon ${classNames}`}
      icon={[regular ? "far" : "fas", iconName]}
    />
  );
}
