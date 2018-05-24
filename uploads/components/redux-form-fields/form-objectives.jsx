import React from "react";
import { Field } from "redux-form";
import Objectives from "../objectives/objectives";
import { requiredSelectItem } from "../../validators/required_select_value";

export default function(props) {
  const {
    items,
    fields,
    fieldName,
    options,
    labelKey,
    classNames,
    valueKey,
    optionComponent,
    valueComponent
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
      optionComponent={optionComponent}
      valueComponent={valueComponent}
      helpText={fields[fieldName].helpText}
      component={Objectives}
      validate={[requiredSelectItem]}
    />
  );
}
