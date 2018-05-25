import React from "react";
import { Field } from "redux-form";
import Slider from "../slider/slider";
import { required, nada } from "../../validators/required";

export default function(props) {
  const { items, fields, fieldName, classNames } = props;
  
  return (
    <Field
      items={items}
      name={fields[fieldName].key}
      classNames={classNames}
      label={fields[fieldName].label}
      errorText={fields[fieldName].validation}
      helpText={fields[fieldName].helpText}
      component={Slider}
      validate={[fields[fieldName].mandatory ? required : nada]}
    />
  );
}
