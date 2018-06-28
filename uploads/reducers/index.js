import { combineReducers } from "redux";
import personal from "../modules/about-you/personal-details/personal-details-reducer";
import address from "../modules/about-you/address/addresses-reducer";
import contact from "../modules/about-you/contact/contact-details-reducer";

import subHeader from "../modules/sub-header/sub-header-reducer";
import dashboard from "../modules/dashboard/reducers/dashboard-reducer";
import tracker from "../modules/tracker/tracker-reducer";
import assets from "../modules/financials/assets/assets-reducer";
import liabilities from "../modules/financials/liabilities/liabilities-reducer";
import wealth from "../modules/financials/wealth/wealth-reducer";
import investments from "../modules/financials/investments/investments-reducer";
import dependants from "../modules/financials/dependants/dependants-reducer";
import tax from "../modules/tax/tax-reducer";
import login from "../modules/login/login-reducer";
import risk from "../modules/investmentRisks/risk/risk-reducer";
import wealthPlanning from "../modules/wealth-services/wealth-services-reducer";
import experience from "../modules/investmentRisks/experience/experience-reducer";
import terms from "../modules/terms/terms-reducer";
import investmentServices from "../modules/investment-mandate/investment-service/investment-service-reducer";
import reporting from "../modules/investment-mandate/reporting/reporting-reducer";
import confirmation from "../modules/investment-mandate/confirmation/confirmation-details-reducer";
import accountant from "../modules/advisers/accountant/accountant-reducer";
import adviser from "../modules/advisers/legal-adviser/legal-adviser-reducer";
import thirdParty from "../modules/advisers/third-party/third-party-reducer";
import isaDeclaration from "../modules/investment-mandate/isa-declaration/isa-declaration-details-reducer";
import choice from "../modules/investment-mandate/choice/portfolio-choice-reducer";
import portfolioRisk from "../modules/investment-mandate/risk/portfolio-risk-reducer";
import portfolioIncome from "../modules/investment-mandate/income/income-reducer";
import body from "../modules/body/body-reducer";

import { reducer as reduxFormReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import accounts from "../modules/banks/bank-accounts-reducer";
import refData from "../modules/reference-data/reference-data-reducer";

const appReducer = combineReducers({
  body,
  form: reduxFormReducer,
  routing: routerReducer,
  personal,
  address,
  subHeader,
  contact,
  dashboard,
  tracker,
  assets,
  liabilities,
  wealth,
  investments,
  dependants,
  tax,
  login,
  risk,
  experience,
  wealthPlanning,
  terms,
  investmentServices,
  reporting,
  accounts,
  refData,
  confirmation,
  accountant,
  adviser,
  thirdParty,
  isaDeclaration,
  choice,
  portfolioRisk,
  portfolioIncome
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = initialState;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
  return appReducer(state, action);
};

export default rootReducer;
