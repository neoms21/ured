import React, { Component } from "react";
import splitter from "../../utils/string-splitter";
import formStyles from "../../sass/forms.scss";
import fieldStyles from "../Fields.scss";
import styles from "./sort-code-field.scss";
import Tooltip from "../../components/Tooltip/tooltip";
import _ from "lodash";
import { PropTypes } from "prop-types";

export default class SortCodeField extends Component {
  constructor(props) {
    super(props);
    // console.log('IN cons',props);
    this.state = this.setStateForSortCodeInputs(props.fieldValue);
  }

  setStateForSortCodeInputs(value) {
    if (!value) {
      return {
        sc1: { value: "" },
        sc2: { value: "" },
        sc3: { value: "" }
      };
    }

    const values = splitter(value, 2);

    const obj = {
      sc1: { value: values[0] },
      sc2: { value: values[1] },
      sc3: { value: values[2] }
    };
    //  console.log(...obj);
    return { ...obj };
  }

  handleChange = (e, nextId) => {
    const value = e.target.value;
    const isError = !/^\d{1,2}$/.test(value);
    const newState = {
      ...this.state,
      [e.target.id]: {
        ...this.state[e.target.id],
        value: value,
        error: isError
      }
    };

    this.setState({ ...newState });

    this.propogateToForm(newState, isError);

    if (value.length === 2 && nextId && this[nextId] && !isError) this[nextId].focus();
  };

  propogateToForm = (state, error) => {
    const combinedValue = Object.values(
      _.mapValues(state, function(o) {
        return o.value;
      })
    ).join("");

    if (error || combinedValue.length === 6) {
      this.props.input.onBlur(combinedValue);
      this.props.input.onChange(combinedValue);
    }
  };

  render() {
    const {
      label,
      input,
      helpText,
      meta: { touched, error },
      errorText,
      classNames,
      maxLength
    } = this.props;

    return (
      <div className={classNames}>
        <div className={`${formStyles["label-container"]}`}>
          <label className="col-12">{label}</label>
          {helpText && <Tooltip iconName="question-circle" text={helpText} />}
        </div>
        <div className={styles.codes}>
          <input
            id="sc1"
            maxLength={maxLength}
            className={` ${styles["sort-code-input"]} ${
              this.state.sc1.error ? "input-error" : ""
            }`}
            value={this.state.sc1.value}
            onChange={e => this.handleChange(e, "sc2")}
           
          />{" "}
          <div className={styles.separator} />
          <input
            id="sc2"
            ref={cntr => (this.sc2 = cntr)}
            maxLength={maxLength}
            className={`${styles["sort-code-input"]} ${
              this.state.sc2.error ? "input-error" : ""
            }`}
            value={this.state.sc2.value}
            onChange={e => this.handleChange(e, "sc3")}
           
          />{" "}
          <div className={styles.separator} />
          <input
            id="sc3"
            ref={cntr => (this.sc3 = cntr)}
            maxLength={maxLength}
            className={`${styles["sort-code-input"]} ${
              this.state.sc3.error ? "input-error" : ""
            }`}
            value={this.state.sc3.value}
            onChange={this.handleChange}
          
          />
        </div>
        {touched &&
          error && (
            <div className={`form-error`}>
              {error && typeof error === "string" ? error : errorText}
            </div>
          )}
      </div>
    );
  }
}

SortCodeField.propTypes = {
  maxLength: PropTypes.number
};

SortCodeField.defaultProps = {
  maxLength: 2
};
