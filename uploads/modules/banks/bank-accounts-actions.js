import {
  FETCH_ACCOUNTS_SUCCESS,
  SELECT_DISPLAY_FIELDS,
  ADD_BANK_ACCOUNT,
  REMOVE_BANK_ACCOUNT,
  SAVE_ACCOUNTS_FAILURE,
  SAVE_ACCOUNTS_SUCCESS
} from "./bank-accounts-action-types";
import httpProxy from "../../utils/httpProxy";
import { saveListFields } from "./../../actions/actions";

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
export function saveBankAccounts(
  data,
  keys,
  bankAccounts,
  page,
  restrictedFields
) {
  let fieldNames = ["entityId"];

  bankAccounts.forEach((b, i) => {
    fieldNames = [
      ...fieldNames,
      ...restrictedFields.map(f => f + (i + 1)),
      ...b.displayFields.map(f => f + (i + 1))
    ];
  });

  let modifiedData = { ...data };
  const fieldKeys = [...Object.keys(modifiedData)];
  fieldKeys.forEach(k => {
    if (fieldNames.indexOf(k) === -1) {
      modifiedData[k] = undefined;
    }
  });
  return saveListFields(
    modifiedData,
    keys,
    page,
    bankAccounts,
    SAVE_ACCOUNTS_SUCCESS,
    SAVE_ACCOUNTS_FAILURE,
    "/dashboard",
    "bankAccounts"
  );
}

export function selectDisplayFields(
  currencies,
  currencyId,
  isUkBankAccount,
  index
) {
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
