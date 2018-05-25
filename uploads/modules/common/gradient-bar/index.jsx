import React, { Component } from "react";
import styles from "./styles.scss";

export default class 
GradientBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: ""
    };
  }

  render() {
    const { heading, gradient, leftLabel, rightLabel, innerText } = this.props;

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
    return {
      background: gradient ? `-webkit-linear-gradient(${gradient})` : "#FFF"
    };
  };
}
