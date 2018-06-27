import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./radio.scss";
import formStyles from "../../sass/forms.scss";
import Tooltip from "../../components/Tooltip/tooltip";

class RadioGroup extends Component {
  componentDidMount() {
    this.props.input.onChange(this.props.fieldValue);
  }

  onChange = e => {
    this.props.input.onChange(e.target.value);
    if (this.props.handleChange) {
      this.props.handleChange(e.target.value);
    }
  };

  render() {
    const {
      input,
      disabled,
      label,
      className,
      items,
      input: { name },
      helpText,
      errorText,
      meta: { touched, error }
    } = this.props;

    return (
      <fieldset className={`form__field ${className || ""}`}>
        {label && (
          <div
            className={`col-12 ${formStyles["label-container"]} ${
              styles["group-label"]
            }`}
          >
            <span>{label}</span>
            {helpText && <Tooltip iconName="question-circle" text={helpText} />}
          </div>
        )}

        <div>
          {items.map((item, i) => (
            <div
              key={i}
              className={
                touched && error && error[name] === undefined
                  ? styles.error
                  : ""
              }
            >
              <input
                {...input}
                name={name}
                type="radio"
                value={item.id}
                disabled={disabled}
                onChange={this.onChange}
                checked={input.value.toString() === item.id.toString()}
                className="error"
                id={`${name}-${item.id}`}
              />
              <label htmlFor={`${name}-${item.id}`} className={styles.label}>
                {item.value}
                {item.helpText && (
                  <Tooltip iconName="question-circle" text={item.helpText} />
                )}
              </label>
            </div>
          ))}
        </div>
        {touched &&
          error &&
          error[name] === undefined && (
            <div className="form-error">{errorText}</div>
          )}
      </fieldset>
    );
  }
}

RadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
  // name: PropTypes.string.isRequired,
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired || PropTypes.string.isRequired,
      value: PropTypes.any.isRequired
    })
  ).isRequired,
  heading: PropTypes.string,
  meta: PropTypes.object,
  required: PropTypes.bool,
  disabled: PropTypes.bool
};

export default RadioGroup;
