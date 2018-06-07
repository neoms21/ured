import React, { Component } from "react";
import commonStyles from "../../../sass/common.scss";
import { Field } from "redux-form";
import FormRadioControl from "../../../components/redux-form-fields/form-radiogroup-field";
import { required } from "../../../validators/required";
import CountrySelectField from "../../../components/fields/country-select-field";
import CountrySelectOption from "./../../../components/fields/country-option";
import CountryValueOption from "../../../components/fields/country-value";
import { requiredSelectItem } from "../../../validators/required_select_value";
import FormTextArea from "../../../components/redux-form-fields/form-textarea-field";
import YesNo from "../../common/yes-no";
import Objectives from "../../../components/redux-form-fields/form-objectives";

class InvestmentService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: {}
    };
  }

  componentDidMount() {
    this.props.setTracker();
    this.props.fetchRefData();
    if (!this.props.loadComplete) {
      this.props.fetchServices();
    }
  }

  handlePortfolioChange = value => {
    if (value === "3") {
      this.props.hidePages();
    } else {
      this.props.showPages();
    }
  };

  handleCustodianQuestionClick = answer => {
    this.props.toggleCustodyAnswer(this.props.formValues, answer.id);
  };

  render() {
    const {
      loadComplete,
      fields,
      portfolioTypes,
      currencies,
      objectives,
      portfolioTimeHorizons,
      formValues
    } = this.props;

    return (
      <div>
        <h2>Investment service and objectives</h2>

        <p className={commonStyles.paragraph}>
          This application sets out the investment approach and policies of your
          Investment Mandate with Schroder & Co. Limited, trading as Cazenove
          Capital.
        </p>

        <p className={commonStyles.paragraph}>
          In defining your view of risk we draw your attention to the risk
          warnings set out in <a>Appendix 1 of our Terms of Business</a> (the
          “Terms”). Please refer to the Terms for the definition of capitalised
          terms used in this document.
        </p>
        {loadComplete &&
          formValues && (
            <div>
              <h3>Portfolio type</h3>
              <Field
                name="portfolioServiceType"
                component={FormRadioControl}
                label={fields["portfolioServiceType"].label}
                errorText={fields["portfolioServiceType"].validation}
                items={portfolioTypes}
                fieldValue={fields["portfolioServiceType"].value}
                validate={[required]}
                handleChange={this.handlePortfolioChange}
              />
              <Field
                label={fields["portfolioCurrencyType"].label}
                helpText={fields["portfolioCurrencyType"].helpText}
                name="portfolioCurrencyType"
                options={currencies}
                selectedCountry={fields["portfolioCurrencyType"].value}
                optionComponent={CountrySelectOption}
                valueComponent={CountryValueOption}
                component={CountrySelectField}
                errorText={fields["portfolioCurrencyType"].validation}
                validate={[requiredSelectItem]}
              />
              {this.props.formValues &&
                this.props.formValues["portfolioServiceType"] !== "3" && (
                  <div>
                    <h3>Aims and objectives</h3>

                    <Objectives
                      items={objectives}
                      fieldName="portfolioObjectives"
                      fields={this.props.fields}
                      errorText={fields["portfolioObjectives"].validation}
                    />
                  </div>
                )}
              <Field
                name="portfolioTimeHorizon"
                component={FormRadioControl}
                helpText={fields["portfolioTimeHorizon"].helpText}
                label={fields["portfolioTimeHorizon"].label}
                errorText={fields["portfolioTimeHorizon"].validation}
                items={portfolioTimeHorizons}
                fieldValue={fields["portfolioTimeHorizon"].value}
                validate={[required]}
              />
              <h3>Custody</h3>
              <div className={commonStyles.info}>
                Schroder & Co. Limited will be custodian of your assets.
              </div>

              <YesNo
                fields={fields}
                fieldName="hasAlternativeExternalCustodian"
                classNames={commonStyles.help}
                onSelect={this.handleCustodianQuestionClick}
              />

              {formValues["hasAlternativeExternalCustodian"] && (
                <FormTextArea
                  fields={fields}
                  fieldName="requiresAlternativeExternalCustodian"
                  mandatory={
                    fields["requiresAlternativeExternalCustodian"].mandatory
                  }
                  errorText={
                    fields["requiresAlternativeExternalCustodian"].validation
                  }
                />
              )}
            </div>
          )}
      </div>
    );
  }
}

export default InvestmentService;
