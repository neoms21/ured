import { fetchFields, saveFields } from "../../../actions/actions";
import {
  FETCH_SERVICE_SUCCESS,
  FETCH_SERVICE_FAILURE,
  TOGGLE_CUSTODIAN_ANSWER,
  SAVE_INVESTMENT_SERVICE_SUCCESS,
  SAVE_INVESTMENT_SERVICE_FAILURE
} from "./invesetment-service-action-types";

export function fetchInvestmentService(page) {
  return fetchFields(page, FETCH_SERVICE_SUCCESS, FETCH_SERVICE_FAILURE);
}

export function saveInvestmentServices(data, page) {
  return saveFields(
    { data, page },
    SAVE_INVESTMENT_SERVICE_SUCCESS,
    SAVE_INVESTMENT_SERVICE_FAILURE,
    "/investment-mandate/reporting"
  );
}

// export function toggleObjective(payload){
//   return {
//     type: TOGGLE_OBJECTIVE,
//     payload
//   }
// }
export function toggleCustody(formValues, hasCustodian){
  return { type: TOGGLE_CUSTODIAN_ANSWER, payload:{formValues, hasCustodian} };
}