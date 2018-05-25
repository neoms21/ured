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
    classNames,
    selectedItem
  } = props;
  return (
    <Field
      items={items}
      selectedItem={selectedItem}
      name={fields[fieldName].key}
     
      classNames={classNames}
      label={fields[fieldName].label}
      errorText={fields[fieldName].validation}
      helpText={fields[fieldName].helpText}
      component={BigButtons}
    />
  );
}
