import React, { Component } from "react";
import splitter from "../../utils/string-splitter";
import formStyles from "../../sass/forms.scss";
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

  // componentDidMount() {
  //   this.props.input.onBlur("");
  // }

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.meta.touched && !this.combinedValue(this.state)) {
      // console.log(nextProps);
      // nextProps.input.onBlur("");
      // nextProps.input.onChange("");
      this.props.input.onBlur("");
      this.props.input.onChange("");
    }
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

    if (value.length === 2 && nextId && this[nextId] && !isError)
      this[nextId].focus();
  };

  combinedValue = state => {
    return Object.values(
      _.mapValues(state, function(o) {
        return o.value;
      })
    ).join("");
  };

  propogateToForm = (state, error) => {
    console.log(state, error);
    if (error || this.combinedValue(state).length === 6) {
      this.props.input.onBlur(this.combinedValue(state));
      this.props.input.onChange(this.combinedValue(state));
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
    console.log(touched);

    return (
      <div className={classNames}>
        <div className={`${formStyles["label-container"]}`}>
          <label className="col-12">{label}</label>
          {helpText && <Tooltip iconName="question-circle" text={helpText} />}
        </div>
        {/* <input
          type="hidden"
          {...input}
          value={`${this.state.sc1.value}${this.state.sc3.value}${
            this.state.sc3.value
          }`}
        /> */}
        <div className={styles.codes}>
          <input
            id="sc1"
            maxLength={maxLength}
            className={` ${styles["sort-code-input"]} ${
              this.state.sc1.error ||
              (touched && !this.combinedValue(this.state))
                ? "input-error"
                : ""
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
              this.state.sc2.error ||
              (touched && !this.combinedValue(this.state))
                ? "input-error"
                : ""
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
              this.state.sc3.error ||
              (touched && !this.combinedValue(this.state))
                ? "input-error"
                : ""
            }`}
            value={this.state.sc3.value}
            onChange={this.handleChange}
          />
        </div>
        {((touched && error) ||
          (touched && !this.combinedValue(this.state))) && (
          <div className={`form-error`}>{errorText}</div>
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
