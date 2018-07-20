import React, { Component } from "react";
import styles from "./personal-details.scss";
import PropTypes from "prop-types";
import TextField from "../../../components/redux-form-fields/Textfield";
import "react-select/dist/react-select.css";
import RFSelectField from "../../../components/redux-form-fields/form-select-field";
import { Field } from "redux-form";
import CountrySelectField from "../../../components/fields/country-select-field";
import CountrySelectOption from "../../../components/fields/country-option";
import CountryValueOption from "../../../components/fields/country-value";
import LinearDropdown from "../../../components/fields/linear-dropdown";
import { requiredSelectItem } from "../../../validators/required_select_value";
import dateValidatorComposer from "../../../validators/date-validator";
import formStyles from "../../../sass/forms.scss";
import WizardBox from "../../wizard/wizard";

const dateValidator = dateValidatorComposer();

class PersonalDetails extends Component {
  componentDidMount() {
    this.props.setTracker();
    if (!this.props.loadComplete) {
      this.props.fetchPersonalDetails(this.props.reviewField);
      this.props.fetchLists();
    }
  }

  render() {
    const {
      fields,
      loadComplete,
      titles,
      countries,
      maritalStatuses,
      getPosition,
      saveReviewField,
      closeWizard
    } = this.props;

    return (
      <div>
        <h2>Personal information</h2>
        {loadComplete && (
          <div>
            <div className={` row`}>
              <RFSelectField
                classNames="col-lg-4 col-md-4 col-sm-4 col-xs-12"
                fields={fields}
                fieldName="title"
                options={titles}
                labelKey="value"
                valueKey="id"
              />
            </div>
            <div className="row">
              <TextField
                classNames="col-lg-4 col-md-4 col-sm-4 col-xs-12"
                fields={fields}
                fieldName="firstName"
              />
              <TextField
                classNames="col-lg-4 col-md-4 col-sm-4 col-xs-12"
                fields={fields}
                fieldName="middleName"
              />
              <TextField
                classNames="col-lg-4 col-md-4 col-sm-4 col-xs-12"
                fields={fields}
                fieldName="lastName"
              />
            </div>
            <div>
              <TextField fields={fields} fieldName="previousName" />
            </div>

            <div
              id="div-dateOfBirth"
              className={styles.names}
              ref={el => (this["dateOfBirth"] = el)}
            >
              <div>
                <TextField
                  classNames={
                    this.props.reviewField === "dateOfBirth"
                      ? formStyles["wizard-focus"]
                      : ""
                  }
                  placeholder="    /    /"
                  fields={fields}
                  fieldName="dateOfBirth"
                  extraValidator={dateValidator}
                />
                <span className={styles.hintText}>DD/MM/YYYY</span>
              </div>
            </div>

            <TextField fields={fields} fieldName="placeOfBirth" />

            <div className={styles["field-container"]} id="div-maritalStatus">
              <Field
                label={fields["maritalStatus"].label}
                name="maritalStatus"
                items={maritalStatuses}
                selectedItem={fields.maritalStatus.value}
                component={LinearDropdown}
                errorText={fields.maritalStatus.validation}
                helpText={fields.maritalStatus.helpText}
                validate={[requiredSelectItem]}
              />
            </div>

            <Field
              label={fields["nationality"].label}
              helpText={fields["nationality"].helpText}
              name="nationality"
              options={countries}
              selectedCountry={fields.nationality.value}
              optionComponent={CountrySelectOption}
              valueComponent={CountryValueOption}
              component={CountrySelectField}
              errorText={fields.nationality.validation}
              validate={[requiredSelectItem]}
            />
            <div id="div-occupation">
              <TextField fields={fields} fieldName="occupation" />
            </div>

            {/* {this.props.reviewField && (
              <div
                style={{
                  ...getPosition(this[this.props.reviewField]),
                  position: "absolute",
                  zIndex: 9000000
                }}
              >
                <WizardBox
                  onNextClick={saveReviewField}
                  onCloseClick={closeWizard}
                />
              </div>
            )} */}
          </div>
        )}
      </div>
    );
  }
}

PersonalDetails.propTypes = {
  handleSubmit: PropTypes.func,
  savePersonalDetails: PropTypes.func,
  fields: PropTypes.object,
  loadComplete: PropTypes.bool,
  titles: PropTypes.array,
  dateFields: PropTypes.array
};

PersonalDetails.defaultProps = {
  handleSubmit: undefined,
  fields: {},
  loadComplete: false,
  titles: [],
  savePersonalDetails: undefined,
  dateFields: []
};

export default PersonalDetails;
