import React, { Component } from "react";
import styles from "./dashboard.scss";
import { Accordion } from "react-accessible-accordion";
import { Group } from "./group/index";
import "./accordion.css";

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchDashboardData();
    this.props.setSubHeader();
    this.props.hideTracker();
  }

  handleItemClick = subSection => {
    this.props.fetchPages(subSection.key);
  };

  componentWillUnmount() {
    this.props.broadcastWindowSize(window.innerWidth);
  }

  render() {
    const { groups } = this.props;
    return (
      <div className={` ${styles.dashboard}`}>
        <Accordion accordion={false}>
          {groups.map(group => <Group key={group.key} group={group} onSubSectionClick={this.handleItemClick} />)}
        </Accordion>
      </div>
    );
  }
}

export default Dashboard;
