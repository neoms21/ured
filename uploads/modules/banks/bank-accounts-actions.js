import { fetchFields } from "../../actions/actions";
import {
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_FAILURE,
  SELECT_DISPLAY_FIELDS
} from "./bank-accounts-action-types";

export default function fetchAccounts(page) {
  return fetchFields(
    page,
    FETCH_ACCOUNTS_SUCCESS,
    FETCH_ACCOUNTS_FAILURE,
    "/advisers"
  );
}

export function selectDisplayFields(currencies, currencyId, isUkBankAccount) {
  return {
    type: SELECT_DISPLAY_FIELDS,
    payload: { currencies, currencyId, isUkBankAccount }
  };
}
