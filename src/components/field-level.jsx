import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import LinearDropdown from "./linear-dropdown";

const required = value => value ? undefined : 'Required'
const items = [
    {id: 1, value: 'Married'},
    {id: 1, value: 'Single'},
    {id: 1, value: 'Divorced'},
    {id: 1, value: 'Unknown'},
    {id: 1, value: 'Civil partner'},
    {id: 1, value: 'Hulk'},
    {id: 1, value: 'Superman'},
];

class FieldLevelValidationForm extends Component {


    submit = (values) => {
        console.log(values);
    };

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <Field name="username" type="text"
                       component={LinearDropdown} label="Username"
                       items={items}
                       validate={[required]}
                />

                <div>
                    <button type="submit">Submit</button>
                    <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                </div>
            </form>
        )
    }

}

export default reduxForm({
    form: 'fieldLevelValidation' // a unique identifier for this form
})(FieldLevelValidationForm)