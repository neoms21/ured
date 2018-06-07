import React, { Component } from "react";
import formStyles from "../../sass/forms.scss";
import Tooltip from "../../components/Tooltip/tooltip";

class TextAreaField extends Component {
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
    this.props.input.onChange(this.props.fieldValue);
  }
  render() {
    const {
      meta: { touched, error },
      label,
      id,
      errorText,
      helpText,
      hideLabel,
      classNames
    } = this.props;

    return (
      <div>
        <div className={` ${formStyles["field-container"]} ${classNames} `}>
          {!hideLabel && (
            <div className={formStyles["label-container"]}>
              <label className={formStyles.fieldLabel}>{label}</label>
              {helpText && (
                <Tooltip iconName="question-circle" text={helpText} />
              )}
            </div>
          )}

          <div
            className={`${
              formStyles["currency-container"] 
            } col-md-12 col-xs-12 ${touched && error ? "input-error" : ""}`}
          >
            <textarea
              id={`ta-${id}`}
              rows={5}
              onChange={this.onChange}
              onBlur={this.onBlur}
              className={`${formStyles["currency-input"]}`}
              value={this.state.fieldValue}
            />
          </div>

          {touched && error && <div className="form-error">{errorText}</div>}
        </div>
      </div>
    );
  }
}

export default TextAreaField;
