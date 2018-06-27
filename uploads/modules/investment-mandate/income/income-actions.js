import { fetchFields, saveListFields } from "../../../actions/actions";

import {
  FETCH_PORTFOLIO_INCOME_SUCCESS,
  FETCH_PORTFOLIO_INCOME_FAILURE,
  SAVE_PORTFOLIO_INCOME_SUCCESS,
  SAVE_PORTFOLIO_INCOME_FAILURE,
  ADD_REGULAR_PAYMENT,
  REMOVE_REGULAR_PAYMENT,
  REMOVE_ALL_PAYMENTS,
  TOGGLE_INCOME_SEPARATE,
  TOGGLE_INCOME_REQUIREMENTS,
  TOGGLE_REGULAR_PAYMENTS
} from "./income-action-types";

export function fetchPortfolioIncome(page) {
  return fetchFields(
    page,
    FETCH_PORTFOLIO_INCOME_SUCCESS,
    FETCH_PORTFOLIO_INCOME_FAILURE
  );
}

export function savePortfolioIncome(
  data,
  keys,
  allPayments,
  page,
  nonListFields
) {
  return saveListFields(
    data,
    keys,
    page,
    allPayments,
    SAVE_PORTFOLIO_INCOME_SUCCESS,
    SAVE_PORTFOLIO_INCOME_FAILURE,
    "/investment-mandate/reporting",
    "portfolioRegularPayments",
    nonListFields
  );
}

export function addRegularPayment(currentValues) {
  return {
    type: ADD_REGULAR_PAYMENT,
    payload: { currentValues }
  };
}

export function removeRegularPayment(index, currentValues) {
  return {
    type: REMOVE_REGULAR_PAYMENT,
    payload: { index, currentValues }
  };
}

export function removeAllPayments(currentValues) {
  return {
    type: REMOVE_ALL_PAYMENTS,
    payload: { currentValues }
  };
}

export function toggleIncomeSeparate(answer, currentValues) {
  return {
    type: TOGGLE_INCOME_SEPARATE,
    payload: { answer, currentValues }
  };
}

export function toggleIncomeRequirements(answer, currentValues) {
  return {
    type: TOGGLE_INCOME_REQUIREMENTS,
    payload: { answer, currentValues }
  };
}

export function toggleRegularPayments(answer, currentValues) {
  return {
    type: TOGGLE_REGULAR_PAYMENTS,
    payload: { answer, currentValues }
  };
}
