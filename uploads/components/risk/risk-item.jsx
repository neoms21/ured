import React from "react";
import styles from "./styles.scss";

const RiskItem = ({
  risk,
  returnText,
  value,
  selected,
  id,
  onClick,
  error,
  touched
}) => {
  return (
    <div
      className={`${styles["risk-item"]} ${
        selected ? styles["risk-item-active"] : ""
      }`}
      onClick={onClick}
    >
      <div
        className={`${styles.radio} ${touched && error ? "input-error" : ""}`}
        id={`div-${id}`}
       
      />
      {selected && <div id={`chk-${risk}`} className={styles.checkMark} />}
      <div className={styles.info}>
        <div className={styles.item}>
          <label>Return: </label>
          <span className={styles.value}>{returnText}</span>
        </div>
        <div className={styles.item}>
          <label>Risk: </label>
          <span className={styles.value}>{risk}</span>
        </div>
        <div className={`${styles.item} ${styles.description}`}>
          <span>{value}</span>
        </div>
      </div>
    </div>
  );
};

export default RiskItem;
