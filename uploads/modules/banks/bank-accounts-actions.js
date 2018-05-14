import { fetchFields } from "../../actions/actions";
import {
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_FAILURE,
  SELECT_DISPLAY_FIELDS,
  ADD_BANK_ACCOUNT,
  REMOVE_BANK_ACCOUNT
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

export function selectDisplayFields(currencies, currencyId, isUkBankAccount, index) {
  return {
    type: SELECT_DISPLAY_FIELDS,
    payload: { currencies, currencyId, isUkBankAccount, index }
  };
}


export function addBankAccount(currentValues, currencies) {
  return {
    type: ADD_BANK_ACCOUNT,
    payload: { currentValues, currencies }
  };
}

export function removeBankAccount(index, currentValues) {
  return { type: REMOVE_BANK_ACCOUNT, payload: { index, currentValues } };
}