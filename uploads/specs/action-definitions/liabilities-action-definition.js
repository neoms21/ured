import { fetchLiability, saveLiability } from "../../modules/financials/liabilities/liabilities-actions";
import { FETCH_LIABILITY_SUCCESS, SAVE_LIABILITY_SUCCESS } from "../../modules/financials/liabilities/liabilities-action-types";

export default {
  name: "accountant actions",
  fetchSuccessAction: FETCH_LIABILITY_SUCCESS,
  fetchFn: fetchLiability,
  saveSuccessAction: SAVE_LIABILITY_SUCCESS,
  saveFn: saveLiability,
  redirectAction: {
    payload: { args: ["/financials/wealth"], method: "push" },
    type: "@@router/CALL_HISTORY_METHOD"
  }
};
