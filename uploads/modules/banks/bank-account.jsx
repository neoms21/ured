import React from "react";
import BorderButton from "../common/buttons/border-button";
import styles from "./accounts.scss";
import { Field } from "redux-form";
import BlankButton from "../common/buttons/blank-button";
import LinearDropdown from "../../components/fields/linear-dropdown";
import CountrySelectOption from "../../components/fields/country-option";
import CountryValueOption from "../../components/fields/country-value";
import CountrySelectField from "../../components/fields/country-select-field";
import { requiredSelectItem } from "../../validators/required_select_value";
import SortCode from "../../components/redux-form-fields/form-sortcode-field";
import InputField from "../../components/fields/input-field";
import { required, nada } from "../../validators/required";

import alphaNumericValidatorComposer from "../../validators/alpha-numeric-validator";
import numericValidatorComposer from "../../validators/numeric-validator";
import conditionalFieldsValidator from "./validators/conditional-fields-validator";
import accountNumberValidator from "./validators/account-number-validator";

const buildingReferenceValidator = alphaNumericValidatorComposer(1, 18);
const ibanValidator = alphaNumericValidatorComposer(34);
const bicValidator = alphaNumericValidatorComposer(8, 11);
const fedwireValidator = numericValidatorComposer(9);

const renderField = (fields, name, index, relatedFields) => {
  const fieldName = `${name}${index}`;
  //  console.log(getField(name,index,fields));
  return (
    <div key={fieldName} className="row">
      {name === "bankAccountSortCode" ? (
        <SortCode
          classNames="col-lg-6 col-md-8 col-sm-8 col-xs-12"
          fields={fields}
          fieldName={fieldName}
        />
      ) : (
        <Field
          key={fieldName}
          classNames="col-lg-6 col-md-8 col-sm-8 col-xs-12"
          id={fields[fieldName].key}
          fieldValue={fields[fieldName].value}
          value={fields[fieldName].value}
          readOnly={fields[fieldName].readonly}
          name={fields[fieldName].key}
          helpText={fields[fieldName].helpText}
          component={InputField}
          label={fields[fieldName].label}
          errorText={fields[fieldName].validation}
          validate={getValidators(name, index, fields)}
        />
      )}
    </div>
  );
};

export default function({
  index,
  fields,
  onRemoveClick,
  onAddClick,
  showAdd,
  currencies,
  displayFields,
  handleUKAccountChange,
  handleCurrencyChange,
  relatedFields,
  repetitions
}) {
  return (
    <div>
      <h3>Bank account {index}</h3>

      <Field
        label={fields[`isUKBankAccount${index}`].label}
        name={`isUKBankAccount${index}`}
        items={[{ id: true, value: "Yes" }, { id: false, value: "No" }]}
        showOther={false}
        selectedItem={fields[`isUKBankAccount${index}`].value}
        component={LinearDropdown}
        errorText={fields[`isUKBankAccount${index}`].validation}
        helpText={fields[`isUKBankAccount${index}`].helpText}
        onSelect={item => {
          handleUKAccountChange(item, index);
        }}
      />

      <Field
        label={fields[`bankAccountCurrency${index}`].label}
        helpText={fields[`bankAccountCurrency${index}`].helpText}
        name={`bankAccountCurrency${index}`}
        options={currencies}
        selectedCountry={fields[`bankAccountCurrency${index}`].value}
        optionComponent={CountrySelectOption}
        valueComponent={CountryValueOption}
        component={CountrySelectField}
        errorText={fields[`bankAccountCurrency${index}`].validation}
        validate={[requiredSelectItem]}
        onSelectionChange={item => {
          handleCurrencyChange(item, index);
        }}
      />

      {displayFields.map(d => renderField(fields, d, index, relatedFields))}
      {repetitions === 2 && (
        <BlankButton
          type="button"
          text="Remove this bank account"
          onClick={onRemoveClick}
        />
      )}
      {showAdd && (
        <div className={styles.add}>
          <BorderButton
            type="button"
            text="Add another bank account?"
            onClick={onAddClick}
          />
        </div>
      )}
    </div>
  );
}

function getValidators(name, index, fields) {
  const fieldName = `${name}${index}`;
  switch (name) {
    case "bankAccountBuildingSocietyReference": {
      return [
        fields[fieldName].mandatory ? required : nada,
        buildingReferenceValidator
      ];
    }
    case "bankAccountIBAN": {
      return [fields[fieldName].mandatory ? required : nada, ibanValidator];
    }
    case "bankBicCode": {
      return [conditionalFieldsValidator, bicValidator];
    }
    case "bankAbaFedwire": {
      return [conditionalFieldsValidator, fedwireValidator];
    }
    case "bankAccountNumber": {
      return [fields[fieldName].mandatory ? required : nada, accountNumberValidator];
    }
    default: {
      return [fields[fieldName].mandatory ? required : nada];
    }
  }
}
