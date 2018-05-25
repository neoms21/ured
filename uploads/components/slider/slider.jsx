import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./slider.scss";
import PropTypes from "prop-types";

const css = {
  transition: "left .1s linear",
  top: "90px",
  zIndex: 99999
};

class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: props.selectedItem,
      position: "absolute",
      selected: false
    };
  }

  componentDidMount() {
    this.selectDefault();
  }

  handleOnChange = (e, id) => {
    this.setStateForSlider(e.currentTarget.offsetLeft, id.toString(), true);
  };

  setStateForSlider = (offset, id) => {
    this.setState({
      left: offset - 7,
      selected: true,
      selectedItem: id
    });

    if (this.props.input) {
      this.props.input.onChange(id);
    }
  };

  step = (id, label) => {
    return (
      <a
        key={id}
        id={`step-${id}`}
        className={`${styles.step}`}
        onClick={e => this.handleOnChange(e, id)}
        ref={cntr => (this[`ref${id}`] = cntr)}
      >
        <div id={styles.left} />
        <div className={styles.divider} />
        <span className={styles["stepLabel"]}>{label}</span>
        <div id={styles.right} />
      </a>
    );
  };

  selectDefault = () => {
    // if (this.state.selected) return;
    if (this.ref3 && !this.state.selectedItem) {
      this.setStateForSlider(this.ref3.offsetLeft, "3");
    }
  };

  render() {
    const { items, label } = this.props;
    return (
      <div className={styles.container}>
        <h3> {label}</h3>
        <img
          style={{
            ...css,
            position: this.state.position,
            left: this.state.left
          }}
          src="images/slider-button.svg"
          onClick={this.handleImageClick}
          alt="marker"
        />

        <div className={styles.slider}>
          {items.map(item => this.step(item.id, item.label))}
        </div>
      </div>
    );
  }
}

export default Slider;

Slider.propTypes = {
  items: PropTypes.array
};

Slider.defaultProps = {
  items: []
};
