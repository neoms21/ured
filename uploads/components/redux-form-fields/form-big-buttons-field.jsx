import React from "react";
import { Field } from "redux-form";
import BigButtons from "../big-buttons/big-buttons";
import { requiredSelectItem } from "../../validators/required_select_value";
import { nada } from "../../validators/required";

export default function(props) {
  const {
    items,
    fields,
    fieldName,
    options,
    labelKey,
    classNames,
    valueKey
  } = props;
  return (
    <Field
      items={items}
      name={fields[fieldName].key}
      options={options}
      valueKey={valueKey}
      labelKey={labelKey}
      classNames={classNames}
      label={fields[fieldName].label}
      errorText={fields[fieldName].validation}
      helpText={fields[fieldName].helpText}
      component={BigButtons}
    />
  );
}
