import React, { Component } from "react";

import formStyles from "../../sass/forms.scss";
import { Field } from "redux-form";
import LinearDropdown from "./../../components/fields/linear-dropdown";
import CountrySelectOption from "../../components/fields/country-option";
import CountryValueOption from "../../components/fields/country-value";
import CountrySelectField from "../../components/fields/country-select-field";
import { requiredSelectItem } from "../../validators/required_select_value";
import TextField from "../../components/redux-form-fields/Textfield";
import SortCode from "../../components/redux-form-fields/form-sortcode-field";

class BankAccounts extends Component {
  componentDidMount() {
    this.props.setSubHeader();

    if (!this.props.currencies || this.props.currencies.length === 0) {
      this.props.fetchRefData();
    }
    if (!this.props.loadComplete) {
      this.props.fetchAccounts();
    }
  }

  renderTextField = fieldName => (
    <div key={fieldName} className="row">
      {fieldName === "bankAccountSortCode" ? (
        <SortCode
          classNames="col-lg-6 col-md-8 col-sm-8 col-xs-12"
          fields={this.props.fields}
          fieldName={fieldName}
        />
      ) : (
        <TextField
          classNames="col-lg-6 col-md-8 col-sm-8 col-xs-12"
          fields={this.props.fields}
          fieldName={fieldName}
          isMixed={
            this.props.relatedFields &&
            this.props.relatedFields.indexOf(fieldName) !== -1
          }
        />
      )}
    </div>
  );

  handleCurrencyChange = item => {
    this.props.selectDisplayFields(
      this.props.currencies,
      item.id,
      this.props.formValues.isUKBankAccount
    );
  };

  handleUKAccountChanged = item => {
    this.props.selectDisplayFields(
      this.props.currencies,
      this.props.formValues.bankAccountCurrency,
      item.id
    );
  };

  render() {
    const { currencies, fields, loadComplete, displayFields } = this.props;
    return (
      <div>
        <h2>Bank accounts</h2>
        <p className={formStyles.info}>
          Provide details of the Nominated Account into which you want to make
          payments in relation to your Portfolio. If you want to setup payments
          to different accounts you can add further accounts and specify
          payments to these in the mandates section.
        </p>
        {loadComplete && (
          <div>
            <Field
              label={fields["isUKBankAccount"].label}
              name="isUKBankAccount"
              items={[{ id: true, value: "Yes" }, { id: false, value: "No" }]}
              showOther={false}
              selectedItem={fields.isUKBankAccount.value}
              component={LinearDropdown}
              errorText={fields.isUKBankAccount.validation}
              helpText={fields.isUKBankAccount.helpText}
              onSelect={this.handleUKAccountChanged}
            />

            <Field
              label={fields["bankAccountCurrency"].label}
              helpText={fields["bankAccountCurrency"].helpText}
              name="bankAccountCurrency"
              options={currencies}
              selectedCountry={fields["bankAccountCurrency"].value}
              optionComponent={CountrySelectOption}
              valueComponent={CountryValueOption}
              component={CountrySelectField}
              errorText={fields["bankAccountCurrency"].validation}
              validate={[requiredSelectItem]}
              onSelectionChange={this.handleCurrencyChange}
            />

            {displayFields.map(d => this.renderTextField(d))}
          </div>
        )}
      </div>
    );
  }
}

export default BankAccounts;
