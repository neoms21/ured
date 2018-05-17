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

export function saveAccountant(data, page) {
  return saveFields(
    {  data, page },
    SAVE_ACCOUNTANT_SUCCESS,
    SAVE_ACCOUNTANT_FAILED,
    "/advisers/legal-adviser"
  );
}
