import React from "react";

import styles from "./wizard-styles.scss";
import PrimaryButton from "../common/buttons/primary-button";

const WizardBox = ({ onNextClick, onCloseClick }) => {
  return (
    <div className={styles["wizard-box"]}>
      <div className={styles.head}>
        <span className={styles.counter}>1 of 6</span>
        <span className={styles.close} onClick={onCloseClick}>
          Close tour &times;
        </span>
      </div>

      <div className={styles["close-container"]}>
        <PrimaryButton type="button" text="Next" onClick={onNextClick} />
      </div>
    </div>
  );
};

export default WizardBox;
