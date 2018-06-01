import { fetchFields, saveListFields } from "../../../actions/actions";
import {
  FETCH_DEPENDANTS_FAILED,
  FETCH_DEPENDANTS_SUCCESS,
  SAVE_DEPENDANTS_FAILED,
  SAVE_DEPENDANTS_SUCCESS,
  ADD_DEPENDANT,
  REMOVE_DEPENDANT,
  REMOVE_ALL_DEPENDANTS
} from "./dependants-action-types";

export function fetchDependants(page) {
  return fetchFields(page, FETCH_DEPENDANTS_SUCCESS, FETCH_DEPENDANTS_FAILED);
}
export function saveDependants(data, keys, addresses, page, nonListFields) {
  return saveListFields(
    data,
    keys,
    page,
    addresses,
    SAVE_DEPENDANTS_SUCCESS,
    SAVE_DEPENDANTS_FAILED,
    "/dashboard",
    "dependants",
    nonListFields
  );
}

export function addDependant(currentValues) {
  return {
    type: ADD_DEPENDANT,
    payload: { currentValues }
  };
}

export function removeDependant(index, currentValues) {
  return {
    type: REMOVE_DEPENDANT,
    payload: { index, currentValues }
  };
}

export function removeAllDependants() {
  return {
    type: REMOVE_ALL_DEPENDANTS
  };
}
