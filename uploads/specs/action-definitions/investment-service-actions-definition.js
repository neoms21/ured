import {
  FETCH_SERVICE_SUCCESS,
  SAVE_INVESTMENT_SERVICE_SUCCESS
} from "./../../modules/investment-mandate/investment-service/invesetment-service-action-types";
import {
  fetchInvestmentService,
  saveInvestmentServices
} from "../../modules/investment-mandate/investment-service/investment-service-actions";

export default {
  name: "investment service actions",
  fetchSuccessAction: FETCH_SERVICE_SUCCESS,
  fetchFn: fetchInvestmentService,
  saveSuccessAction: SAVE_INVESTMENT_SERVICE_SUCCESS,
  saveFn: saveInvestmentServices,
  redirectAction: {
    payload: { args: ["/investment-mandate/reporting"], method: "push" },
    type: "@@router/CALL_HISTORY_METHOD"
  }
};
