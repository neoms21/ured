import { fetchFields, saveFields } from "../../../actions/actions";
import {
  FETCH_LEGAL_ADVISER_FAILED,
  FETCH_LEGAL_ADVISER_SUCCESS,
  SAVE_LEGAL_ADVISER_FAILED,
  SAVE_LEGAL_ADVISER_SUCCESS
} from "./legal-adviser-action-types";

export function fetchLegalAdviser(key) {
  return fetchFields(key, FETCH_LEGAL_ADVISER_SUCCESS, FETCH_LEGAL_ADVISER_FAILED);
}

export function saveLegalAdviser(data, page) {
  return saveFields(
    {  data, page },
    SAVE_LEGAL_ADVISER_SUCCESS,
    SAVE_LEGAL_ADVISER_FAILED,
    "/advisers/third-party"
  );
}
