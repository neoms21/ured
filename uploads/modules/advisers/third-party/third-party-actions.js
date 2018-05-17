import { fetchFields, saveFields } from "../../../actions/actions";
import {
  FETCH_THIRD_PARTY_FAILED,
  FETCH_THIRD_PARTY_SUCCESS,
  SAVE_THIRD_PARTY_FAILED,
  SAVE_THIRD_PARTY_SUCCESS
} from "./third-party-action-types";

export function fetchThirdParty(key) {
  return fetchFields(key, FETCH_THIRD_PARTY_SUCCESS, FETCH_THIRD_PARTY_FAILED);
}

export function saveThirdParty(data, page) {
  return saveFields(
    {  data, page },
    SAVE_THIRD_PARTY_SUCCESS,
    SAVE_THIRD_PARTY_FAILED,
    "/advisers/third-party"
  );
}
