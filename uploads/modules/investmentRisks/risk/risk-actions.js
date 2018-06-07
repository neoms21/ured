import {
  fetchFields,
  saveFields,
  fetchRefData
} from "../../../actions/actions";
import {
  FETCH_RISK_DATA_SUCCESS,
  FETCH_RISK_DATA_FAILURE,
  SAVE_RISK_DATA_SUCCESS,
  SAVE_RISK_DATA_FAILURE,
  TOGGLE_OBJECTIVE,
  CLEAR_OTHER_OBJECTIVE,
  FETCH_RISK_LEVEL_SUCCESS,
  FETCH_RISK_LEVEL_FAILURE,
  TOGGLE_CASH_RESERVES
} from "./risk-action-types";

export function fetchRiskData(key) {
  return fetchFields(key, FETCH_RISK_DATA_SUCCESS, FETCH_RISK_DATA_FAILURE);
}

export function fetchRiskLevels() {
  return fetchRefData(
    ["riskLevel"],
    FETCH_RISK_LEVEL_SUCCESS,
    FETCH_RISK_LEVEL_FAILURE
  );
}

function saveRisk(data, page, nextPage) {
  return saveFields(
    { data, page },
    SAVE_RISK_DATA_SUCCESS,
    SAVE_RISK_DATA_FAILURE,
    nextPage
  );
}

export function saveUnderstanding(obj, page) {
  return saveRisk(obj, page, "/understanding-risk/investment-objectives");
}

export function saveRiskReturn(obj, page) {
  return saveRisk(obj, page, "/understanding-risk/risk-attitude");
}

export function saveObjectives(obj, page) {
  return saveRisk(obj, page, "/understanding-risk/risk-tolerance");
}

export function saveCashReserves(obj, page) {
  return saveRisk(obj, page, "/dashboard");
}

export function saveRiskTolerance(obj, page) {
  return saveRisk(obj, page, "/understanding-risk/risk-return");
}

export function saveRiskAttitude(obj, page) {
  return saveRisk(obj, page, "/understanding-risk/cash-reserves");
}

export function toggleObjective(id) {
  return {
    type: TOGGLE_OBJECTIVE,
    payload: id
  };
}

export function toggleCashReserves(formValues, answer) {
  return {
    type: TOGGLE_CASH_RESERVES,
    payload: { formValues, answer }
  };
}

export function clearOtherObjective() {
  return {
    type: CLEAR_OTHER_OBJECTIVE
  };
}
