import React, { Component } from "react";
import styles from "./attitude.scss";

export default class AttitudeMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: "linear-gradient(90deg, rgb(45, 85, 178) 28%, white 62%)"
    };
  }

  render() {
    const { heading, gradient, leftLabel, rightLabel , innerText} = this.props;
    
    return (
      <div className={styles.marker}>
        <span className={styles.heading}>{heading}</span>
        <div style={this.gradientString(gradient)} className={styles.result}>
          {innerText}
        </div>
        <div className={styles.indicators}>
          <span className={styles.left}>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      </div>
    );
  }

  gradientString = gradient => {
    return { background: `-webkit-linear-gradient(${gradient})` };
  };
}
