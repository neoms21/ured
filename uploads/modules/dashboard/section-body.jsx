import React from "react";
import styles from "./dashboard.scss";
import Icon from "../../components/font-awesome/Icon";

export default function(props) {
  const { subSections, onItemClick } = props;
  return (
    <div className={styles["section-body"]}>
      {subSections &&
        subSections.map(s => (
          <button
            onClick={() => {
              onItemClick(s);
            }}
            id={`btn-${s.key}`}
            className={styles["sub-section"]}
            key={s.key}
          >
            <span>{s.label}</span>
            <div className={`${styles.chevron}`} />
            {s.complete && (
              <Icon iconName="check" classNames={styles.complete} />
            )}
          </button>
        ))}
    </div>
  );
}
