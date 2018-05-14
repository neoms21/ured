import { fetchFields } from "../../actions/actions";
import {
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_FAILURE,
  SELECT_DISPLAY_FIELDS
} from "./bank-accounts-action-types";
import httpProxy from "../../utils/httpProxy";

export default function fetchAccounts(page, currencies) {
  return dispatch => {
    return httpProxy
      .read(page)
      .then(response => {
        dispatch(accountsFetchedSuccessfully(response.data, currencies));
      })
      .catch(err => {
        console.error(err);
        // dispatch(wrapperAction(failureActionType, err));
      });
  };
}

function accountsFetchedSuccessfully(accounts, currencies) {
  return {
    type: FETCH_ACCOUNTS_SUCCESS,
    payload: { accounts, currencies }
  };
}

// return fetchFields(
//   page,
//   FETCH_ACCOUNTS_SUCCESS,
//   FETCH_ACCOUNTS_FAILURE,
//   "/advisers"
// );

export function selectDisplayFields(currencies, currencyId, isUkBankAccount) {
  return {
    type: SELECT_DISPLAY_FIELDS,
    payload: { currencies, currencyId, isUkBankAccount }
  };
}
