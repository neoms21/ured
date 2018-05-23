import { fetchFields, saveFields } from "../../../actions/actions";
import {
  FETCH_SERVICE_SUCCESS,
  FETCH_SERVICE_FAILURE,
  TOGGLE_OTHER_OBJECTIVE,
  TOGGLE_OBJECTIVE,
  TOGGLE_CUSTODIAN_ANSWER,
  SAVE_INVESTMENT_SERVICE_SUCCESS,
  SAVE_INVESTMENT_SERVICE_FAILURE
} from "./invesetment-service-action-types";

export function fetchInvestmentService(page) {
  return fetchFields(page, FETCH_SERVICE_SUCCESS, FETCH_SERVICE_FAILURE);
}

export function toggleOther() {
  return {
    type: TOGGLE_OTHER_OBJECTIVE
  };
}


export function saveInvestmentServices(data, page) {
  return saveFields(
    { data, page },
    SAVE_INVESTMENT_SERVICE_SUCCESS,
    SAVE_INVESTMENT_SERVICE_FAILURE,
    "/investment-mandate/reporting"
  );
}

export function toggleObjective(payload){
  return {
    type: TOGGLE_OBJECTIVE,
    payload
  }
}
export function toggleCustody(payload){
  return { type: TOGGLE_CUSTODIAN_ANSWER, payload };
}