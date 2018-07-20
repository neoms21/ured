import React from "react";
import InputField from "../fields/input-field";
import { Field } from "redux-form";
import { required } from "../../validators/required";

const nada = value => undefined;
export default function(props) {
  const {
    fields,
    fieldName,
    placeholder,
    isDate,
    classNames,
    hideLabel,
    extraValidator
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
      inReview={fields[fieldName].inReview}
      {...props}
      validate={[
        fields[fieldName].mandatory && !fields[fieldName].inReview
          ? required
          : nada,
        extraValidator ? extraValidator : nada
      ]}
    />
  );
}
