import React from "react";
import formStyles from "../../../sass/forms.scss";
import TextField from "../../../components/redux-form-fields/Textfield";
import ImageButton from "../../../modules/common/buttons/image-button";
import RFSelectField from "../../../components/redux-form-fields/form-select-field";

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
        <div className={formStyles.hintText}>DD/MM/YYYY</div>
      </div>
     
      {index > 1 && (
        <ImageButton
          image="remove"
          type="button"
          text="Remove this dependant"
          onClick={onRemoveClick}
        />
      )}
    </div>
  );
}
