import React from "react";
import { Field } from "redux-form";
import ReactSelect from "../fields/select-field";
import { required } from "../../validators/required";

export default function(props) {
  const {
    fields,
    fieldName,
    options,
    labelKey,
    classNames,
    valueKey,
    optionComponent,
    valueComponent,
    onItemChange
  } = props;
  return (
    <Field
      name={fields[fieldName].key}
      options={options}
      valueKey={valueKey}
      labelKey={labelKey}
      classNames={classNames}
      label={fields[fieldName].label}
      errorText={fields[fieldName].validation}
      optionComponent={optionComponent}
      valueComponent={valueComponent}
      onItemChange={onItemChange}
      // helpText={fields[fieldName].helpText}
      component={ReactSelect}
      validate={[required]}
      {...props}
    />
  );
}
