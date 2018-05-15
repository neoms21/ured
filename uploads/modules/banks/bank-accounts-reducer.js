import {
  FETCH_ACCOUNTS_SUCCESS,
  SELECT_DISPLAY_FIELDS,
  ADD_BANK_ACCOUNT,
  REMOVE_BANK_ACCOUNT
} from "./bank-accounts-action-types";
import {
  assignFields,
  assignListFields,
  addListItem,
  removeListItem
} from "./../reducers-helper";

const initialState = {
  fieldNames: [],
  fields: {},
  dataLoaded: false,
  maxRepeats: 2,
  accounts: [],
  displayFields: [],
  relatedFields: ["bankBicCode", "bankAbaFedwire"]
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_ACCOUNTS_SUCCESS: {
      const { data } = action.payload.accounts;
      console.log(Object.keys(action.payload.accounts.schema));
      const assignedFieldsState = assignListFields(
        state,
        { payload: action.payload.accounts },
        "accounts",
        true
      );
      if (data.accounts && data.accounts.length > 0) {
        return { ...assignedFieldsState, displayFields: [] };
      } else {
        const ukCurrency = action.payload.currencies.find(
          c => c.currencyCode.toLowerCase() === "gbp"
        );
        const currency =
          assignedFieldsState.accounts[0].fields.bankAccountCurrency1.value ===
          undefined
            ? ukCurrency.id
            : assignedFieldsState.accounts[0].fields.bankAccountCurrency1.value;

        const newFields = {
          ...assignedFieldsState.accounts[0].fields,
          isUKBankAccount1: {
            ...assignedFieldsState.accounts[0].fields["isUKBankAccount1"],
            value: true
          },
          bankAccountCurrency1: {
            ...assignedFieldsState.accounts[0].fields["bankAccountCurrency1"],
            value: currency
          }
        };
        assignedFieldsState.accounts[0].fields = { ...newFields };
        assignedFieldsState.accounts[0].displayFields = getDisplayFields(
          action.payload.currencies,
          true,
          currency
        );

        return {
          ...assignedFieldsState,
          accounts: [...assignedFieldsState.accounts]
        };
      }
    }

    case SELECT_DISPLAY_FIELDS: {
      const { currencies, isUkBankAccount, currencyId, index } = action.payload;

      const accToUpdate = state.accounts[index - 1];

      const displayFields = getDisplayFields(
        currencies,
        isUkBankAccount,
        currencyId
      );
      console.log(accToUpdate);
      console.log({
        ...state,
        accounts: [
          ...state.accounts.slice(0, index - 1),
          { ...accToUpdate, displayFields: displayFields },
          ...state.accounts.slice(index)
        ]
      });

      return {
        ...state,
        accounts: [
          ...state.accounts.slice(0, index - 1),
          { ...accToUpdate, displayFields: displayFields },
          ...state.accounts.slice(index)
        ]
      };
    }

    case ADD_BANK_ACCOUNT: {
      const newState = addListItem(
        state,
        { payload: { currentValues: action.payload.currentValues } },
        "accounts"
      );

      const ukCurrency = action.payload.currencies.find(
        c => c.currencyCode.toLowerCase() === "gbp"
      );

      const newFields = {
        ...newState.accounts[1].fields,
        isUKBankAccount2: {
          ...newState.accounts[1].fields["isUKBankAccount2"],
          value: true
        },
        bankAccountCurrency2: {
          ...newState.accounts[1].fields["bankAccountCurrency2"],
          value: ukCurrency.id
        }
      };
      newState.accounts[1].fields = { ...newFields };
      newState.accounts[1].displayFields = getDisplayFields(
        action.payload.currencies,
        true,
        ukCurrency.id
      );

      return newState;
    }

    case REMOVE_BANK_ACCOUNT: {
      return removeListItem(state, action, "accounts");
    }
    default:
      return state;
  }

  function getDisplayFields(currencies, isUkBankAccount, currencyId) {
    const currency = currencies.find(c => c.id === currencyId);
    var newDisplayFields = [];

    if (!currency) return state.displayFields;

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
