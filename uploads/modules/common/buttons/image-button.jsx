import React from "react";
import styles from "./buttons.scss";

export default function(props) {
  const { type, text, onClick, classNames, id, image } = props;

  return <button id={`btn-${id}`} className={`${styles["image-button"]} ${classNames}`} type={type} onClick={onClick}>
      <span>
        {image && <img src={`images/${image}.svg`} alt={image}  />}
        {text}
      </span>
    </button>;
}
