import React from "react";
import Select from "react-select";
import "../../sass/select.css";

import Tooltip from "../../components/Tooltip/tooltip";
import formStyles from "../../sass/forms.scss";
RFReactSelect.defaultProps = {
  multi: false,
  className: ""
};

export default function RFReactSelect({
  input,
  options,
  multi,
  classNames,
  labelKey,
  valueKey,
  label,
  helpText,
  errorText,
  onItemChange,
  meta: { touched, error }
}) {
  
  const { name, value, onBlur, onChange, onFocus } = input;
  return (
    <div className={`${classNames}`} id={name}>
      <div className={` ${formStyles["label-container"]}`}>
        <label className="col-12">{label}</label>
        {helpText && <Tooltip iconName="question-circle" text={helpText} />}
      </div>

      <div>
        {" "}
        <Select
          id={name}
          valueKey={valueKey}
          name={name}
          labelKey={labelKey}
          value={value}
          searchable={false}
          multi={multi}
          options={options}
          clearable={false}
          onChange={
            multi ? multiChangeHandler(onChange) : singleChangeHandler(onChange, onItemChange)
          }
          onBlur={() => onBlur(value)}
          onFocus={onFocus}
          className={touched && error && !error[name] ? "input-error" : ""}
        />
      </div>
      {touched &&
        error &&
        !error[name] && <div className={`form-error`}>{errorText}</div>}
    </div>
  );
}

/**
 * onChange from Redux Form Field has to be called explicity.
 */
function singleChangeHandler(func,onItemChange) {
  return function handleSingleChange(value) {
    onItemChange(value);
    func(value ? value.id : "");
  };
}

/**
 * onBlur from Redux Form Field has to be called explicity.
 */
function multiChangeHandler(func) {
  return function handleMultiHandler(values) {
    func(values.map(value => value.value));
  };
}

// /**
//  * For single select, Redux Form keeps the value as a string, while React Select
//  * wants the value in the form { value: "grape", label: "Grape" }
//  *
//  * * For multi select, Redux Form keeps the value as array of strings, while React Select
//  * wants the array of values in the form [{ value: "grape", label: "Grape" }]
//  */
// function transformValue(value, options, multi) {
//     if (multi && typeof value === 'string') return [];
//
//     const filteredOptions = options.filter(option => {
//         return multi
//             ? value.indexOf(option.value) !== -1
//             : option.value === value;
//     });
//
//     return multi ? filteredOptions : filteredOptions[0];
// }
