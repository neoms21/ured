import {
  fetchLegalAdviser,
  saveLegalAdviser
} from "../../modules/advisers/legal-adviser/legal-adviser-actions";
import {
  FETCH_LEGAL_ADVISER_SUCCESS,
  SAVE_LEGAL_ADVISER_SUCCESS
} from "../../modules/advisers/legal-adviser/legal-adviser-action-types";

export default {
  name: "legal adviser actions",
  fetchSuccessAction: FETCH_LEGAL_ADVISER_SUCCESS,
  fetchFn: fetchLegalAdviser,
  saveSuccessAction: SAVE_LEGAL_ADVISER_SUCCESS,
  saveFn: saveLegalAdviser,
  redirectAction: {
    payload: { args: ["/advisers/third-party"], method: "push" },
    type: "@@router/CALL_HISTORY_METHOD"
  }
};
