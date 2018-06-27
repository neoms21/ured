import React from "react";
import formStyles from "../../../sass/forms.scss";
import TextField from "../../../components/redux-form-fields/Textfield";
import ImageButton from "../../../modules/common/buttons/image-button";
import RFSelectField from "../../../components/redux-form-fields/form-select-field";
import CurrencyFormField from "../../../components/redux-form-fields/currency-field";
import LinearDropdownField from "../../common/yes-no";

import FormRadioControl from "../../../components/redux-form-fields/form-radiogroup-field";
import styles from "./income.scss";

export default function({
  index,
  fields,
  bankAccounts,
  frequencies,
  onRemoveClick,
  showSource,
  options
}) {
  return (
    <div className={styles["regular-payment"]}>
      {showSource && (
        <FormRadioControl
          options={options}
          fields={fields}
          fieldName={`regularPaymentSource${index}`}
        />
      )}
      <div className="row">
        <RFSelectField
          fields={fields}
          classNames="col-md-10 col-lg-8 col-sm-12 col-xs-12"
          fieldName={`regularPaymentBankAccountId${index}`}
          options={bankAccounts}
          labelKey="value"
          valueKey="id"
        />
      </div>

      <CurrencyFormField
        fields={fields}
        fieldName={`regularPaymentAmount${index}`}
        items={frequencies}
      />

      <LinearDropdownField
        fields={fields}
        fieldName={`regularPaymentFrequency${index}`}
        items={frequencies}
        classNames={styles.frequencies}
      />

      <TextField
        classNames="col-lg-6 col-md-6 col-sm-12 col-xs-12"
        isDate={true}
        placeholder="    /    /"
        fields={fields}
        fieldName={`regularPaymentStartDate${index}`}
      />
      <span className={formStyles.hintText}>DD/MM/YYYY</span>

      {index > 1 && (
        <div>
          <ImageButton
            id={`remove${index}`}
            image="remove"
            type="button"
            text="Remove this payment"
            onClick={onRemoveClick}
          />
        </div>
      )}
    </div>
  );
}
