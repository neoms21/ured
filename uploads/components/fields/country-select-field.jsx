import React, { Component } from "react";
import Select from "react-select";
import "../../sass/select.css";
import formStyles from "../../sass/forms.scss";
import Tooltip from "../../components/Tooltip/tooltip";
import valueComponent from "./country-value";

import { find } from "lodash";

class CountrySelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: find(props.options, o => {
        return o.id === props.selectedCountry;
      })
    };
  }

  handleChange = value => {
    console.log('CHANFSK', value);
    this.setState({ value });
    this.props.input.onChange(value ? value.id : undefined);
    if (this.props.onSelectionChange) {
      this.props.onSelectionChange(value);
    }
  };

  render() {
    const {
      options,
      label,
      input,
      helpText,
      optionComponent,
      meta: { touched, error },
      errorText,
      classNames
    } = this.props;
    const { name, value, onBlur, onFocus } = input;

    return (
      <div className={classNames} id={name}>
        <div className={` ${formStyles["label-container"]}`}>
          <label className="col-12">{label}</label>
          {helpText && <Tooltip iconName="question-circle" text={helpText} />}
        </div>
        <Select
          id={name}
          name={name}
          value={this.state.value}
          searchable={true}
          options={options}
          optionComponent={optionComponent}
          valueComponent={valueComponent}
          clearable={false}
          onChange={this.handleChange}
          onBlur={() => onBlur(value)}
          onFocus={onFocus}
          className={touched && error && !error[name] ? "input-error" : ""}
        />
        {touched &&
          error &&
          !error[name] && <div className="form-error">{errorText}</div>}
      </div>
    );
  }
}

export default CountrySelectField;
