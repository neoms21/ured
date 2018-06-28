import React, { Component } from "react";
import styles from "./modal.scss";

import Icon from "../../components/font-awesome/Icon";

export default class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { show: true };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    // Render nothing if the "show" prop is false
    // The gray background

    if (!this.state.show) return null;
    
    return (
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <span className={styles.close} onClick={this.toggle}>
            <Icon iconName="times" />
          </span>
          {this.props.children}
          <div className="footer" />
        </div>
      </div>
    );
  }
}
