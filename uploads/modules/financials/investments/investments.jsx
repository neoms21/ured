import React, { Component } from "react";
import PropTypes from "prop-types";
import formStyles from "../../../sass/forms.scss";
import CheckboxComposite from "../../../components/fields/checkbox-composite";
import CurrencyFormField from "../../../components/redux-form-fields/currency-field";
import FormTextArea from "../../../components/redux-form-fields/form-textarea-field";

class Investments extends Component {
  constructor(props) {
    super(props);
    this.state = { dirtyCheck: false };
  }

  renderValueField = (fields, fieldName, label) => (
    <CheckboxComposite
      id={`cbx-${fieldName}`}
      name="1"
      label={label}
      helpText={fields[fieldName].helpText}
      onChange={checked => {
        this.props.setDirty();
        if (!checked) {
          this.props.fields[fieldName].value = undefined;
        }
      }}
      checked={fields[fieldName].value !== undefined}
    >
      <CurrencyFormField
        fields={fields}
        hideLabel={true}
        fieldName={fieldName}
      />
    </CheckboxComposite>
  );

  renderDescriptionAndValueField = (
    fields,
    fieldName,
    label,
    descriptionField
  ) => (
    <CheckboxComposite
      id={`cbx-${fieldName}`}
      name="1"
      label={label}
      helpText={fields[fieldName].helpText}
      onChange={checked => {
        this.props.setDirty();
        if (!checked) {
          this.props.clearFieldValues([descriptionField, fieldName]);
        }
      }}
      checked={
        fields[fieldName].value !== undefined ||
        fields[descriptionField].value !== undefined
      }
    >
      <FormTextArea fields={fields} fieldName={descriptionField} />

      <CurrencyFormField
        fields={fields}
        hideLabel={false}
        fieldName={fieldName}
      />
    </CheckboxComposite>
  );

  componentDidMount() {
    this.props.setTracker();
    if (!this.props.loadComplete) {
      this.props.fetchInvestments();
    }
  }

  componentWillUnmount() {
    this.props.setPristine();
  }

  render() {
    const { loadComplete, fields } = this.props;
    return (
      <div>
        <h2>Value of investments</h2>

        <h4 className={formStyles["sub-heading"]}>
          Which investments do you hold?
        </h4>
        {loadComplete && (
          <div>
            {this.renderValueField(
              fields,
              "valueOfStocks",
              "Investment portfolio"
            )}
            {this.renderValueField(fields, "valueOfISAs", "ISAs")}
            {this.renderValueField(
              fields,
              "valueOfInsuranceProducts",
              "Insurance based products (Bonds)"
            )}
            {this.renderDescriptionAndValueField(
              fields,
              "valueOfPensions",
              "SIPP(s) and other pensions",
              "pensionDetails"
            )}
            {this.renderValueField(
              fields,
              "valueOfCashDeposits",
              "Cash deposits"
            )}
            {this.renderDescriptionAndValueField(
              fields,
              "valueOfOtherInvestments",
              "Other investments",
              "otherInvestmentDetails"
            )}
          </div>
        )}
      </div>
    );
  }
}

Investments.propTypes = {
  handleSubmit: PropTypes.func,
  fetchInvestments: PropTypes.func,
  saveInvestments: PropTypes.func,
  fields: PropTypes.object,
  loadComplete: PropTypes.bool
};

Investments.defaultProps = {
  handleSubmit: undefined,
  fields: {},
  loadComplete: false,
  fetchInvestments: undefined,
  saveInvestments: undefined
};

export default Investments;
