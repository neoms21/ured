import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import './form.css';
import SegmentedControl from '../components/segmentedControl';

const required = value => (value
    ? undefined
    : 'Required')

const renderField = ({
    input,
    label,
    type,
    meta: {
        touched,
        error,
        warning
    }
}) => (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} placeholder={label} type={type} /> {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    )

class FieldLevelValidationForm extends Component {

    submit = (values) => {
        console.log(values);
    };

    render() {
        const { handleSubmit, pristine, reset, submitting, clearSubmitErrors } = this.props;
        return (
            <form className='container' onSubmit={handleSubmit(this.submit)}>

                <Field
                    name="field1"
                    type="text"
                    component={renderField}
                    label="Field 1"
                    validate={[required]} />
                <Field
                    name="field2"
                    type="text"
                    component={renderField}
                    label="Field 2"
                    validate={[required]} />

                <br />

                <Field
                    name="gender"
                    component={SegmentedControl}
                    heading="What is your gender?"
                    items={
                        [
                            {
                                label: 'Female',
                                value: 'female',
                            },
                            {
                                label: 'Male',
                                value: 'male',
                            },
                        ]
                    }
                    validate={[required]}
                />

                <div>
                    <button type="submit">Submit</button>
                    <button
                        type="button"
                        onClick={clearSubmitErrors}>Clear Errors</button>
                    <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                </div>
            </form>
        )
    }

}

export default reduxForm({
    form: 'form1' // a unique identifier for this form
})(FieldLevelValidationForm)