import {

  fetchThirdParty,
  saveThirdParty
} from "../../modules/advisers/third-party/third-party-actions";

import { FETCH_THIRD_PARTY_SUCCESS, SAVE_THIRD_PARTY_SUCCESS } from "../../modules/advisers/third-party/third-party-action-types";

export default {
  name: "Third party actions",
  fetchSuccessAction: FETCH_THIRD_PARTY_SUCCESS,
  fetchFn: fetchThirdParty,
  saveSuccessAction: SAVE_THIRD_PARTY_SUCCESS,
  saveFn: saveThirdParty,
  redirectAction: {
    payload: { args: ["/dashboard"], method: "push" },
    type: "@@router/CALL_HISTORY_METHOD"
  }
};
