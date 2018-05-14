import {
  FETCH_ACCOUNTS_SUCCESS,
  SELECT_DISPLAY_FIELDS
} from "./bank-accounts-action-types";
import { assignFields, assignListFields } from "./../reducers-helper";

const initialState = {
  fieldNames: [],
  fields: {},
  dataLoaded: false,
  maxRepeats: 2,
  displayFields: [],
  relatedFields: ["bankBicCode", "bankAbaFedwire"]
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_ACCOUNTS_SUCCESS: {
      console.log(
        assignListFields(
          state,
          { payload: action.payload.accounts },
          "accounts", true
        )
      );
      const assignedFieldsState = assignFields(state, {
        payload: action.payload.accounts
      });

      const ukCurrency = action.payload.currencies.find(
        c => c.currencyCode.toLowerCase() === "gbp"
      );
      const isUkAccount =
        assignedFieldsState.fields.isUKBankAccount.value === undefined
          ? true
          : assignedFieldsState.fields.isUKBankAccount.value;

      const currency =
        assignedFieldsState.fields.bankAccountCurrency.value === undefined
          ? ukCurrency.id
          : assignedFieldsState.fields.bankAccountCurrency.value;

      const newBankAccountField = {
        ...assignedFieldsState.fields.isUKBankAccount,
        value: isUkAccount
      };
      const newCurrency = {
        ...assignedFieldsState.fields.bankAccountCurrency,
        value: currency
      };

      return {
        ...assignedFieldsState,
        fields: {
          ...assignedFieldsState.fields,
          isUKBankAccount: { ...newBankAccountField },
          bankAccountCurrency: { ...newCurrency }
        },
        displayFields: getDisplayFields(
          action.payload.currencies,
          isUkAccount,
          currency
        )
      };
    }

    case SELECT_DISPLAY_FIELDS: {
      const { currencies, isUkBankAccount, currencyId } = action.payload;

      return {
        ...state,
        displayFields: getDisplayFields(currencies, isUkBankAccount, currencyId)
      };
    }

    default:
      return state;
  }

  function getDisplayFields(currencies, isUkBankAccount, currencyId) {
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

    return newDisplayFields;
  }
}
