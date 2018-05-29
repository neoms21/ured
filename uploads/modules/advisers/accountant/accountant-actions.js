import { fetchFields, saveFields } from "../../../actions/actions";
import {
  FETCH_ACCOUNTANT_FAILED,
  FETCH_ACCOUNTANT_SUCCESS,
  SAVE_ACCOUNTANT_FAILED,
  SAVE_ACCOUNTANT_SUCCESS
} from "./accountant-action-types";

export function fetchAccountant(key) {
  return fetchFields(key, FETCH_ACCOUNTANT_SUCCESS, FETCH_ACCOUNTANT_FAILED);
}

export function saveAccountant(data, page, entities, entityFieldNames) {
  let newDataObj = { ...data };

  entities.forEach(e => {
    newDataObj[e.name] = {};

    e.fields.forEach(field => {
      newDataObj[e.name][field] = data[field];
      delete newDataObj[field];
    });
  });

  return saveFields(
    { data: newDataObj, page },
    SAVE_ACCOUNTANT_SUCCESS,
    SAVE_ACCOUNTANT_FAILED,
    "/advisers/legal-adviser"
  );
}

// function accountantSavedSuccessfully(data) {
//   return {
//     type: SAVE_ACCOUNTANT_SUCCESS,
//     payload: data
//   };
// }
// function accountantSavedFailure(err) {
//   return {
//     type: SAVE_ACCOUNTANT_FAILED,
//     payload: err
//   };
// }
