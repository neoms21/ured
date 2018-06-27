import React from "react";
import styles from "./buttons.scss";

export default function(props) {
  const { type, text, onClick, classNames, selected, image, id } = props;

  return (
    <button
      className={` ${classNames} ${styles["border-button"]} ${
        styles["button-container"]
      }  ${selected ? styles.selected : ""}`}
      id={`btn-${id}`}
      type={type ? type : "button"}
      onClick={onClick}
    >
      <span>
        {text}
        {image && (
          <img
            src={`images/${image}.svg`}
            alt={image}
            className={styles.image}
          />
        )}
      </span>
    </button>
  );
}
