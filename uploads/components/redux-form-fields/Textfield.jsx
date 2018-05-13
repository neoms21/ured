import React from "react";
import InputField from "../fields/input-field";
import { Field } from "redux-form";
import moment from "moment";
import { DISPLAY_DATE_FORMAT } from "../../constants";
import {required} from '../../validators/required';
import mixedValidator from '../../validators/mixed-validator';

const nada = value => undefined;

const isValidDate = value => {
  const pattern = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (
    value === undefined ||
    (value.trim().length === 10 &&
      pattern.test(value) &&
      moment(value, DISPLAY_DATE_FORMAT).isValid())
  ) {
    return undefined;
  }

  return "Please enter a date in the format MM/YYYY";
};

export default function(props) {
  const {
    fields,
    fieldName,
    placeholder,
    isDate,
    classNames,
    hideLabel,
    isMixed
  } = props; 
  return (
    <Field
      key={fieldName}
      isDate={isDate}
      hideLabel={hideLabel}
      classNames={classNames}
      placeholder={placeholder}
      id={fields[fieldName].key}
      fieldValue={fields[fieldName].value}
      value={fields[fieldName].value}
      readOnly={fields[fieldName].readonly}
      name={fields[fieldName].key}
      helpText={fields[fieldName].helpText}
      component={InputField}
      label={fields[fieldName].label}
      errorText={fields[fieldName].validation}
      validate={[
        fields[fieldName].mandatory ? required : nada,
        isDate ? isValidDate : nada,
        isMixed ? mixedValidator : nada
      ]}
    />
  );
}
