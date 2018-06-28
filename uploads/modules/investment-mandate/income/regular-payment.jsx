import React from "react";
import formStyles from "../../../sass/forms.scss";
import TextField from "../../../components/redux-form-fields/Textfield";
import ImageButton from "../../../modules/common/buttons/image-button";
import RFSelectField from "../../../components/redux-form-fields/form-select-field";
import CurrencyFormField from "../../../components/redux-form-fields/currency-field";
import LinearDropdownField from "../../common/yes-no";

import FormRadioControl from "../../../components/redux-form-fields/form-radiogroup-field";
import styles from "./income.scss";
import amountValidatorComposer from "../../../validators/amount-validator-composer";

const amountValidator = amountValidatorComposer();

export default function({
  index,
  fields,
  bankAccounts,
  frequencies,
  onRemoveClick,
  showSource,
  options,
  onBankAccountChange
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
          onChange={item => {
            onBankAccountChange(item, `regularPaymentBankAccountId${index}`);
          }}
        />
      </div>

      <CurrencyFormField
        fields={fields}
        fieldName={`regularPaymentAmount${index}`}
        items={frequencies}
        extraValidators={amountValidator}
      />

      <LinearDropdownField
        fields={fields}
        fieldName={`regularPaymentFrequency${index}`}
        items={frequencies}
        classNames={styles.frequencies}
      />

      <div>
        <div className={`${styles.start} row`}>
          <TextField
            classNames="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            isDate={true}
            placeholder="    /    /"
            fields={fields}
            fieldName={`regularPaymentStartDate${index}`}
          />
          <span className={formStyles.hintText}>DD/MM/YYYY</span>
        </div>
      </div>
      {/* <div>
        <div className="row">
         
          />
          <span className={formStyles.hintText}>DD/MM/YYYY</span>
        </div>
      </div> */}
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
