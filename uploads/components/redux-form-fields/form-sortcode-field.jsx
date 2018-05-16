import React from "react";
import { Field } from "redux-form";
import SortCodeField from "./../sort-code-field/sort-code-field";
import sortCodeValidator from "../../validators/sort-code-validator";
import { required } from "../../validators/required";

export default function(props) {
  const {
    fields,
    fieldName,

    classNames
  } = props;
  return (
    <Field
      name={fields[fieldName].key}
      classNames={classNames}
      label={fields[fieldName].label}
      errorText={fields[fieldName].validation}
      fieldValue={fields[fieldName].value}
      helpText={fields[fieldName].helpText}
      component={SortCodeField}
      validate={[required, sortCodeValidator]}
    />
  );
}
