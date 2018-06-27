  import React from "react";
import { Field } from "redux-form";
import RadioGroup from "../radio-group/radio-group";
import { required } from "../../validators/required";

export default function(props) {
 
  const { fields, fieldName, options, classNames } = props;
 
  return (
    <Field
      name={fields[fieldName].key}
      items={options}
      classNames={classNames}
      label={fields[fieldName].label}
      errorText={fields[fieldName].validation}
      helpText={fields[fieldName].helpText}
      component={RadioGroup}
      validate={[required]}
      {...props}
    />
  );
}
