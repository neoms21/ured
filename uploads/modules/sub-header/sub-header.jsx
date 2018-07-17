import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./sub-header.scss";
import PercentageCircle from "../../components/percentage-circle";
import { Link } from "react-router-dom";
import Tracker from "../tracker/tracker-container";
import Icon from "../../components/font-awesome/Icon";

class SubHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { showSections: false };
  }

  render() {
    const { hide, title, percentage, showStatus, showTracker } = this.props;
    if (!hide) {
      return (
        <div className={`container ${styles.title} ${showStatus?"": styles.titlePadding}`}>
          <div className={styles.backLinkContainer}>
            {!showStatus && (
              <div className={styles.backLink}>
                <div className={`${styles.chevron}`} />
                <Link to="/dashboard">Dashboard</Link>
              </div>
            )}
            <div className={styles["title-dashboard"]}>
              <h1>{title}</h1>
            </div>
            {showTracker && (
              <div className={styles.showSection}>
                <span
                  className={styles.showSectionText}
                  onClick={() => {
                    this.setState({ showSections: !this.state.showSections });
                  }}
                >
                  {this.state.showSections ? "Hide sections" : "Show sections"}
                  <Icon
                    iconName={`${
                      this.state.showSections ? "chevron-up" : "chevron-down"
                    }`}
                  />
                </span>
                {this.state.showSections && <Tracker />}
              </div>
            )}
          </div>
          {showStatus && (
            <div className={styles.percentage}>
              <PercentageCircle percent={percentage} color="#63C532" />
            </div>
          )}
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default SubHeader;

// export default function SubHeader(props) {

// }

SubHeader.propTypes = {
  hide: PropTypes.bool,
  title: PropTypes.string,
  percentage: PropTypes.number
};

SubHeader.defaultProps = {
  hide: false,
  title: "",
  percentage: 0
};
