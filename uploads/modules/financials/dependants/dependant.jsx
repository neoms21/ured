import React from "react";
import formStyles from "../../../sass/forms.scss";
import TextField from "../../../components/redux-form-fields/Textfield";
import BlankButton from "../../../modules/common/buttons/blank-button";
import BorderButton from "../../../modules/common/buttons/border-button";
import RFSelectField from "../../../components/redux-form-fields/form-select-field";
import styles from "./dependant.scss";

export default function({
  index,
  fields,
  onRemoveClick,
  onAddClick,
  showAdd,
  relationships
}) {
  return (
    <div>
      <h3>Dependant {index}</h3>

      <div className="row">
        <TextField
          classNames="col-lg-12 col-md-12 col-sm-12 col-xs-12"
          fields={fields}
          fieldName={`dependantFullName${index}`}
        />
      </div>
      <div className="row">
        <RFSelectField
          fields={fields}
          classNames="col-lg-6 col-md-6 col-sm-12 col-xs-12"
          fieldName={`dependantRelationship${index}`}
          options={relationships}
          labelKey="value"
          valueKey="id"
        />
      </div>
      <div className="row">
        <TextField
          classNames="col-lg-6 col-md-6 col-sm-12 col-xs-12"
          isDate={true}
          placeholder="    /    /"
          fields={fields}
          fieldName={`dependantDateOfBirth${index}`}
        />
      </div>
      <div className={formStyles.hintText}>DD/MM/YYYY</div>

      <div>
        <BlankButton
          type="button"
          text="Remove this dependant"
          onClick={onRemoveClick}
        />
      </div>

      {showAdd && (
        <div className={styles.submit}>
          <BorderButton
            type="button"
            text="Add another dependant?"
            onClick={onAddClick}
          />
        </div>
      )}
    </div>
  );
}
