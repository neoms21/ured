import { fetchFields, saveFields } from "../../../actions/actions";

import {
  FETCH_PORTFOLIO_RISK_SUCCESS,
  FETCH_PORTFOLIO_RISK_FAILURE,
  SAVE_PORTFOLIO_RISK_SUCCESS,
  SAVE_PORTFOLIO_RISK_FAILURE
} from "./action-types";

export function fetchPortfolioRisk(page) {
  return fetchFields(
    page,
    FETCH_PORTFOLIO_RISK_SUCCESS,
    FETCH_PORTFOLIO_RISK_FAILURE
  );
}

export function savePortfolioRisk(data, page) {
  return saveFields(
    { data, page },
    SAVE_PORTFOLIO_RISK_SUCCESS,
    SAVE_PORTFOLIO_RISK_FAILURE,
    "/investment-mandate/reporting"
  );
}
