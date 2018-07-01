import React from 'react';
import InputField from "../fields/input-field";
import {Field} from "redux-form";

const required = (value, msg) => value ? undefined : msg;
const nada = (value) => undefined;

export default function (props) {
    const {fields, fieldName} = props;
    return (
        <Field
            id={fields[fieldName].key}
            value={fields[fieldName].value}
            component={InputField}
            name={fields[fieldName].key}
            label={fields[fieldName].label}
            errorText={fields[fieldName].validation}
            validate={[fields[fieldName].mandatory ? required : nada]}
        />
    )
}
