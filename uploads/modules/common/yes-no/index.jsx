import React from "react";
import { Field } from "redux-form";
import LinearDropdown from "../../../components/fields/linear-dropdown";
import { nada } from "../../../validators/required";
import { requiredSelectItem } from "../../../validators/required_select_value";

export default function({ fields, fieldName, helpClass }) {
  return (
    <Field
      label={fields[fieldName].label}
      name={fieldName}
      showOther={false}
      items={[
        {
          id: true,
          value: "Yes"
        },
        {
          id: false,
          value: "No"
        }
      ]}
      selectedItem={fields[fieldName].value}
      component={LinearDropdown}
      errorText={fields[fieldName].validation}
      helpText={fields[fieldName].helpText}
      validate={[fields[fieldName].mandatory ? requiredSelectItem : nada]}
      helpClass={helpClass ? helpClass : ""}
    />
  );
}
