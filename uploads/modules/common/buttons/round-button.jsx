import React from "react";
import styles from "./buttons.scss";

export default function(props) {
  
  const { type, text, onClick, selected, id, classNames } = props;

  return (
    <button
      id={id}
      className={`${styles["round-button"]} ${selected ? styles.selected : ""} ${classNames}`}
      type={type ? type : "button"}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
