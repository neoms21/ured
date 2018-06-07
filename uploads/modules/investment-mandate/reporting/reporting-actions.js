import { fetchFields, saveFields } from "../../../actions/actions";
import {
  FETCH_REPORTING_SUCCESS,
  FETCH_REPORTING_FAILED,
  SAVE_REPORTING_SUCCESS,
  SAVE_REPORTING_FAILED,
  TOGGLE_ADDITIONAL_REPORTS
} from "./reporting-action-types";

export function fetchReporting(pageKey) {
  return fetchFields(pageKey, FETCH_REPORTING_SUCCESS, FETCH_REPORTING_FAILED);
}

export function saveReporting(data, page) {
  return saveFields(
    { data, page },
    SAVE_REPORTING_SUCCESS,
    SAVE_REPORTING_FAILED,
    "/investment-mandate/confirmation"
  );
}

export function toggleAdditionalReports(answer){
  return {
    type: TOGGLE_ADDITIONAL_REPORTS,
    payload :{answer}
  }
}
