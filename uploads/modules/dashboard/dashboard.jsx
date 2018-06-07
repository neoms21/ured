import React, { Component } from "react";
import styles from "./dashboard.scss";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
import Icon from "../../components/font-awesome/Icon";

import ReactDOM from "react-dom";
import SectionBody from "./section-body";
import "./accordion.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { status: [] };
  }

  componentDidMount() {
    this.props.fetchDashboardData();
    this.props.setSubHeader();
    this.props.hideTracker();

    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      window.scrollTo(0, this.scrollPosition);
    }
  }

  handleItemClick = subSection => {
    this.props.fetchPages(subSection.key);
  };

  componentWillReceiveProps(nextState) {
    this.setState({ status: [true, ...nextState.sections.map(() => false)] });
  }

  componentWillUnmount() {
    this.props.broadcastWindowSize(window.innerWidth);
  }

  toggleAccordionItems = index => {
    let newStatus = [];

    for (let i = 0; i < this.state.status.length; i++) {
      newStatus.push(index === i ? !this.state.status[i] : false);
    }

    this.setState({ status: newStatus });
  };

  render() {
    const { sections } = this.props;

    return <div className={` ${styles.dashboard}`}>
        <h2>Application sections</h2>
        <Accordion onChange={accIndex => this.toggleAccordionItems(accIndex)}>
          {sections.map((s, i) => (
            <AccordionItem key={s.key} expanded={this.state.status[i]}>
              <AccordionItemTitle>
                <div className={styles.title}>
                  <div className={styles["title-indicator"]}>
                    <Icon iconName="circle" classNames={styles.indicator} />
                    {s.complete && <div className={styles.checkMark} />}

                    <span>{s.label}</span>
                  </div>
                  <Icon
                    iconName={`${
                      this.state.status[i] ? "chevron-up" : "chevron-down"
                    }`}
                  />
                </div>
              </AccordionItemTitle>
              <AccordionItemBody>
                <SectionBody
                  subSections={s.subsections}
                  onItemClick={this.handleItemClick}
                />
              </AccordionItemBody>
            </AccordionItem>
          ))}
        </Accordion>
      </div>;
  }
}

export default Dashboard;
