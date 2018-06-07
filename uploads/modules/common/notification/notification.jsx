import React, { Component } from "react";
import styles from "./notification.scss";
import LinearDropdown from "./../../../components/fields/linear-dropdown";

class Notification extends Component {
  render() {
    const { onClick, content, children, isLight } = this.props;

    return (
      <div className={isLight ? styles["container-light"] : styles.container}>
        <div className={styles.icon}>
          <img src={`images/info.svg`} alt="info" />
        </div>

        <div className={styles.content}>
          {content &&
            content.map((c, i) => (
              <p key={`${c}i`} className={i > 0 ? styles.paragraph : ""}>
                {c}
              </p>
            ))}

          {children}
          {onClick && (
            <LinearDropdown
              showOther={false}
              classNames={styles.buttons}
              name="quesFinancialSector"
              items={[{ id: true, value: "Yes" }, { id: false, value: "No" }]}
              onSelect={onClick}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Notification;
