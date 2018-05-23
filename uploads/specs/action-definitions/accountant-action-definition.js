import { fetchAccountant, saveAccountant } from "../../modules/advisers/accountant/accountant-actions";
import { FETCH_ACCOUNTANT_SUCCESS, SAVE_ACCOUNTANT_SUCCESS } from "../../modules/advisers/accountant/accountant-action-types";

export default {
    name: "accountant actions",
    fetchSuccessAction: FETCH_ACCOUNTANT_SUCCESS,
    fetchFn: fetchAccountant,
    saveSuccessAction: SAVE_ACCOUNTANT_SUCCESS,
    saveFn: saveAccountant,
    redirectAction: {
        payload: { args: ["/advisers/legal-adviser"], method: "push" },
        type: "@@router/CALL_HISTORY_METHOD"
    }
};
