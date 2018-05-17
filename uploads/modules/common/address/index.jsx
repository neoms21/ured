import React from "react";
import TextField from "../../../components/redux-form-fields/Textfield";
import { Field } from "redux-form";
import CountrySelectOption from "../../../components/fields/country-option";
import CountryValueOption from "../../../components/fields/country-value";
import CountrySelectField from "../../../components/fields/country-select-field";
import { requiredSelectItem } from "../../../validators/required_select_value";
import BlankButton from "../../common/buttons/blank-button";

const fieldNames = [
  'addressLine1',
  'addressLine2',
  'addressCity',
  'addressCounty',
  'addressPostCode',
  'addressCountry'
]

export default function({ fields, countries, index, onRemove }) {
  const resultantFieldNames = index
    ? fieldNames.map(f => `${f}${index}`)
    : fieldNames;
//  className={styles.field}
  return (
    <div>
      {resultantFieldNames.map(f => (
        <div key={f} >
          {f.indexOf("Country") !== -1 ? (
            <Field
              label={fields[f].label}
              helpText={fields[f].helpText}
              name={f}
              options={countries}
              selectedCountry={fields[f].value}
              optionComponent={CountrySelectOption}
              valueComponent={CountryValueOption}
              component={CountrySelectField}
              errorText={fields[f].validation}
              validate={[requiredSelectItem]}
            />
          ) : (
            <TextField fields={fields} fieldName={f} />
          )}
        </div>
      ))}

      {index > 1 && (
        <BlankButton
          type="button"
          id="btnRemoveAddress"
          text="Remove this address"
          onClick={() => onRemove(index)}
        />
      )}
    </div>
  );
}
