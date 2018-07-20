import types from "./personal-details-action-types";
import { saveFields, fetchFields } from "../../../../actions/actions";

export function fetchPersonalInformation(pageKey) {
  return fetchFields(pageKey, types.FETCH_PERSONAL_DATA_SUCCESS, types.FETCH_PERSONAL_DATA_FAILED)
}

export function savePersonalInformation(data, fields, page) {
  const readOnlyFieldNames = getReadOnlyFieldNames(fields);
  readOnlyFieldNames.forEach(r => delete data[r]);
  return saveFields(
    {  data, page },
    types.SAVE_PERSONAL_DATA_SUCCESS,
    types.SAVE_PERSONAL_DATA_FAILURE,
    "/about-you/address"
  );
}

function getReadOnlyFieldNames(fields) {
  let names = [];
  Object.keys(fields).forEach(k => {
    if (fields[k].readOnly) names.push(fields[k].key);
  });

  return names;
}
