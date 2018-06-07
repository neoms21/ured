import { fetchFields, saveFields } from "../../actions/actions";
import {
  FETCH_WEALTH_SUCCESS,
  FETCH_WEALTH_FAILURE,
  SAVE_WEALTH_SUCCESS,
  SAVE_WEALTH_FAILURE,
  CLEAR_OTHER_WEALTH_OBJECTIVE,
  TOGGLE_INCLUSION,
  TOGGLE_FINANCIAL_ADVICE
} from "./wealth-services-action-types";

export function fetchWealthServicesData(key) {
  return fetchFields(key, FETCH_WEALTH_SUCCESS, FETCH_WEALTH_FAILURE);
}

export function saveAgreement(data, page) {
  return saveFields(
    { data, page },
    SAVE_WEALTH_SUCCESS,
    SAVE_WEALTH_FAILURE,
    "/wealth-services/wealth-objectives"
  );
}

export function saveWealth(data, page) {
  return saveFields(
    { data, page },
    SAVE_WEALTH_SUCCESS,
    SAVE_WEALTH_FAILURE,
    "/dashboard"
  );
}

export function clearOtherWealthObjective() {
  return {
    type: CLEAR_OTHER_WEALTH_OBJECTIVE
  };
}

export function toggleInclusion(answer) {
  return {
    type: TOGGLE_INCLUSION,
    payload:{answer}
  };
}
export function toggleAdvice(formValues, answer) {
  return {
    type: TOGGLE_FINANCIAL_ADVICE,
    payload: {formValues, answer}
  };
}
