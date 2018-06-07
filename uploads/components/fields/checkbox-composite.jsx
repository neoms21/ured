import React, { Component } from "react";
import Checkbox from "../checkbox/checkbox";
import styles from "./composite.scss";

class CheckboxComposite extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.checked };
  }

  onChange = checked => {
    this.setState({
      checked: checked
    });
    this.props.onChange(checked);
  };

  render() {
    const { id, label, helpText, checked } = this.props;
    return (
      <div className={styles.container}>
        <Checkbox
          id={id}
          label={label}
          checked={checked}
          classNames={`${styles.fieldLabel} ${styles.additionalMargin}`}
          onChange={this.onChange}
          helpText={helpText}
        />

        {this.state.checked && (
          <div className={styles.children}>{this.props.children}</div>
        )}
      </div>
    );
  }
}

export default CheckboxComposite;
