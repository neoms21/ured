import React, { Component } from "react";
import splitter from "../../utils/string-splitter";
import formStyles from "../../sass/forms.scss";
import fieldStyles from "../Fields.scss";
import styles from "./sort-code-field.scss";
import Tooltip from "../../components/Tooltip/tooltip";
import _ from "lodash";

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
    //  console.log(e.target.id, e.target.value, nextId);

    const newState = {
      ...this.state,
      [e.target.id]: { ...this.state[e.target.id], value: e.target.value }
    };

    this.setState({ ...newState });
    const combinedValue = Object.values(
      _.mapValues(newState, function(o) {
        return o.value;
      })
    ).join("");
    this.props.input.onChange(combinedValue);
  };

  render() {
    const {
      label,
      input,
      helpText,
      meta: { touched, error },
      errorText,
      classNames
    } = this.props;

    return (
      <div>
        <div className={`${formStyles["label-container"]}`}>
          <label className="col-12">{label}</label>
          {helpText && <Tooltip iconName="question-circle" text={helpText} />}
        </div>
        <div className={styles.codes}>
          <input
            id="sc1"
            className={`${fieldStyles.input} ${
              touched && error ? "input-error" : ""
            }`}
            value={this.state.sc1.value}
            onChange={e => this.handleChange(e, "sc2")}
          />{" "}
          &nbsp;-
          <input
            id="sc2"
            className={`${fieldStyles.input} ${
              touched && error ? "input-error" : ""
            }`}
            value={this.state.sc2.value}
            onChange={e => this.handleChange(e, "sc3")}
          />{" "}
          &nbsp;-
          <input
            id="sc3"
            className={`${fieldStyles.input} ${
              touched && error ? "input-error" : ""
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
