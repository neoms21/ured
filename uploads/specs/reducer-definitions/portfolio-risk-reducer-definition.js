import riskReducer from "../../modules/investment-mandate/risk/portfolio-risk-reducer";
import definitionComposer from "./definition-composer";
import {
  FETCH_PORTFOLIO_RISK_SUCCESS,
  SAVE_PORTFOLIO_RISK_SUCCESS
} from "../../modules/investment-mandate/risk/action-types";

export default definitionComposer(
  "portfolioRisk",
  riskReducer,
  FETCH_PORTFOLIO_RISK_SUCCESS,
  SAVE_PORTFOLIO_RISK_SUCCESS,{
    fieldNames: [],
    dataLoaded: false,
    fields: {},
    riskReturn: 3
  }
);
