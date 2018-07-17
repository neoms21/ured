import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

class PercentageCircle extends Component {
  constructor(props) {
    super(props);
    const { left, right } = this.calculateRotationDegress(props.percent);

    this.state = {
      percent: this.props.percent,
      borderWidth:
        this.props.borderWidth < 2 || !this.props.borderWidth
          ? 2
          : this.props.borderWidth,
      leftTransformerDegree: left,
      rightTransformerDegree: right
    };
  }

  calculateRotationDegress = percent => {
    let left = "0deg";
    let right = "0deg";

    if (percent >= 50) {
      right = "180deg";
      left = (percent - 50) * 3.6 + "deg";
    } else {
      right = percent * 3.6 + "deg";
      left = "0deg";
    }

    return { left, right };
  };

  componentWillReceiveProps(nextstate) {
    const { left, right } = this.calculateRotationDegress(nextstate.percent);

    this.setState({
      leftTransformerDegree: left,
      rightTransformerDegree: right
    });
  }

  render() {
    return (
      <div
        className={styles.circle}
        style={{
          width: this.props.radius * 2,
          height: this.props.radius * 2,
          borderRadius: this.props.radius,
          backgroundColor: this.props.bgcolor
        }}
      >
        <div
          className={styles["left-wrap"]}
          style={{
            width: this.props.radius,
            height: this.props.radius * 2,
            left: 0
          }}
        >
          <div
            className={styles.loader}
            id="id1"
            style={{
              left: this.props.radius,
              width: this.props.radius,
              height: this.props.radius * 2,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              backgroundColor: this.props.color,
              transform: "rotate(" + this.state.leftTransformerDegree + ")"
            }}
          />
        </div>
        <div
          className={styles["right-wrap"]}
          style={{
            width: this.props.radius,
            height: this.props.radius * 2,
            left: this.props.radius
          }}
        >
          <div
            className={styles.loader2}
            id="id2"
            style={{
              left: -this.props.radius,
              width: this.props.radius,
              height: this.props.radius * 2,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor: this.props.color,
              transform: "rotate(" + this.state.rightTransformerDegree + ")"
            }}
          />
        </div>
        <div
          className={styles["inner-circle"]}
          style={{
            left: this.props.borderWidth,
            top: this.props.borderWidth,
            width: (this.props.radius - this.props.borderWidth) * 2,
            height: (this.props.radius - this.props.borderWidth) * 2,
            borderRadius: this.props.radius - this.props.borderWidth,
            backgroundColor: this.props.innerColor
          }}
        >
          {this.props.children ? (
            this.props.children
          ) : (
            <span className={styles.text}>{this.props.percent}%</span>
          )}
        </div>
      </div>
    );
  }
}

PercentageCircle.propTypes = {
  color: PropTypes.string,
  bgcolor: PropTypes.string,
  innerColor: PropTypes.string,
  radius: PropTypes.number,
  percent: PropTypes.number,
  borderWidth: PropTypes.number,
  textStyle: PropTypes.string
};

PercentageCircle.defaultProps = {
  color: "#000",
  radius: 47,
  percent: 0,
  borderWidth: 8,
  bgcolor: "#e3e3e3",
  innerColor: "#fff",
  disabled: false,
  textStyle: ""
};

export default PercentageCircle;
