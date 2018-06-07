import {
  FETCH_PORTFOLIO_RISK_SUCCESS,
  SAVE_PORTFOLIO_RISK_SUCCESS
} from "../../modules/investment-mandate/risk/action-types";
import {
  fetchPortfolioRisk,
  savePortfolioRisk
} from "../../modules/investment-mandate/risk/actions";

export default {
  name: "portfolio risk actions",
  fetchSuccessAction: FETCH_PORTFOLIO_RISK_SUCCESS,
  fetchFn: fetchPortfolioRisk,
  saveSuccessAction: SAVE_PORTFOLIO_RISK_SUCCESS,
  saveFn: savePortfolioRisk,
  redirectAction: {
    payload: { args: ["/investment-mandate/reporting"], method: "push" },
    type: "@@router/CALL_HISTORY_METHOD"
  }
};
