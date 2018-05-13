import {
  FETCH_ACCOUNTS_SUCCESS,
  SELECT_DISPLAY_FIELDS
} from "./bank-accounts-action-types";
import { assignFields } from "./../reducers-helper";

const initialState = {
  fieldNames: [],
  fields: {},
  dataLoaded: false,
  displayFields: [],
  relatedFields: ["bankBicCode", "bankAbaFedwire"]
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_ACCOUNTS_SUCCESS: {
      return assignFields(state, action);
    }

    case SELECT_DISPLAY_FIELDS: {
      const { currencies, isUkBankAccount, currencyId } = action.payload;

      const currency = currencies.find(c => c.id === currencyId);
      var newDisplayFields = [];

      if (!currency) return state;

      if (isUkBankAccount && currency.currencyCode.toLowerCase() === "gbp") {
        newDisplayFields = [
          "bankAccountProvider",
          "bankAccountName",
          "bankAccountSortCode",
          "bankAccountNumber",
          "bankAccountBuildingSocietyReference",
          "bankAccountIBAN"
        ];
      } else if (
        isUkBankAccount &&
        currency.currencyCode.toLowerCase() !== "gbp"
      ) {
        newDisplayFields = [
          "bankAccountProvider",
          "bankAccountName",
          "bankAccountSortCode",
          "bankAccountNumber",
          "bankAccountBuildingSocietyReference",
          "bankAccountIBAN",
          "bankBicCode",
          "bankAbaFedwire"
        ];
      } else if (
        isUkBankAccount === false &&
        currency.currencyCode.toLowerCase() === "eur"
      ) {
        newDisplayFields = [
          "bankAccountProvider",
          "bankAccountName",
          "bankBicCode",
          "bankAccountIBAN"
        ];
      } else if (
        isUkBankAccount === false &&
        currency.currencyCode.toLowerCase() === "usd"
      ) {
        newDisplayFields = [
          "bankAccountProvider",
          "bankAccountName",
          "bankAccountNumber",
          "bankBicCode",
          "bankAbaFedwire"
        ];
      } else if (
        isUkBankAccount === false &&
        (currency.currencyCode.toLowerCase() !== "usd" &&
          currency.currencyCode.toLowerCase() !== "eur")
      ) {
        newDisplayFields = [
          "bankAccountProvider",
          "bankAccountName",
          "bankAccountNumber",
          "bankBicCode",
          "bankAbaFedwire",
          "bankAccountIBAN"
        ];
      }
      return { ...state, displayFields: newDisplayFields };
    }

    default:
      return state;
  }
}
