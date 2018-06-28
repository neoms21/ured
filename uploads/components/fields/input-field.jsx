import React, { Component } from "react";
import styles from "./input-field.scss";
import Tooltip from "../../components/Tooltip/tooltip";

import formStyles from "../../sass/forms.scss";

export default class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = { fieldValue: props.fieldValue };
  }

  onChange = e => {
    this.setState({ fieldValue: e.target.value });
    this.props.input.onChange(e.target.value);
  };

  onBlur = e => {
    this.props.input.onBlur();
  };

  componentDidMount() {
    this.props.input.value = this.props.fieldValue;
  }

  render() {
    const {
      meta: { touched, error },
      label,
      input,
      id,
      errorText,
      placeholder,
      helpText,
      classNames,
      hideLabel,
      readOnly,
      type,
      applyBootstrapRow
    } = this.props;

    return (
      <div>
        <div className={`${classNames} ${formStyles["field-container"]}`}>
          {!hideLabel && (
            <div className={`col-12 ${formStyles["label-container"]}`}>
              <label>{label}</label>
              {helpText && (
                <Tooltip iconName="question-circle" text={helpText} />
              )}
            </div>
          )}

          <div className={``}>
            <input
              readOnly={readOnly}
              id={id}
              placeholder={placeholder}
              className={`${styles.input} ${
                touched && error ? "input-error" : ""
              } ${readOnly ? "readonly" : ""}`}
              {...input}
              onChange={this.onChange}
              type={type ? type : "text"}
            />
          </div>
          {touched &&
            error && (
              <div className={`form-error`}>
                {error && typeof error === "string" ? error : errorText}
              </div>
            )}
        </div>
      </div>
    );
  }
}
