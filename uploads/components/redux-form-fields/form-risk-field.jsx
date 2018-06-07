import React from "react";
import { Field } from "redux-form";
import RiskGroup from "../risk/risk-item-group";

import { required } from "../../validators/required";

export default function(props) {
  const { fields, fieldName } = props;

  return (
    <Field
      name={fields[fieldName].key}
      label={fields[fieldName].label}
      errorText={fields[fieldName].validation}
      helpText={fields[fieldName].helpText}
      component={RiskGroup}
      validate={[required]}
      {...props}
    />
  );
}
