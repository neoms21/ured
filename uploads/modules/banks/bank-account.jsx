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

import TextField from "../../components/redux-form-fields/Textfield";
import SortCode from "../../components/redux-form-fields/form-sortcode-field";

const renderField = (fields, fieldName, index, relatedFields) => {
  return (
    <div key={fieldName} className="row">
      {fieldName === "bankAccountSortCode" ? (
        <SortCode
          classNames="col-lg-6 col-md-8 col-sm-8 col-xs-12"
          fields={fields}
          fieldName={`${fieldName}${index}`}
        />
      ) : (
        <TextField
          classNames="col-lg-6 col-md-8 col-sm-8 col-xs-12"
          fields={fields}
          fieldName={`${fieldName}${index}`}
          isMixed={
            relatedFields &&
            relatedFields.indexOf(fieldName.replace(index, "")) !== -1
          }
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
