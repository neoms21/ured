import {
  FETCH_ACCOUNTS_SUCCESS,
  SAVE_ACCOUNTS_SUCCESS,
  SELECT_DISPLAY_FIELDS,
  ADD_BANK_ACCOUNT,
  REMOVE_BANK_ACCOUNT
} from "./bank-accounts-action-types";
import {
  assignListFields,
  addListItem,
  removeListItem,
  processSaveResponse
} from "./../reducers-helper";

const initialState = {
  fieldNames: [],
  fields: {},
  dataLoaded: false,
  maxRepeats: 2,
  bankAccounts: [],
  displayFields: [],
  restrictedFields: ["isUKBankAccount", "bankAccountCurrency"]
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_ACCOUNTS_SUCCESS: {
      const { data } = action.payload.accounts;
      const assignedFieldsState = assignListFields(
        state,
        { payload: action.payload.accounts },
        "bankAccounts",
        true
      );
      if (data.bankAccounts && data.bankAccounts.length > 0) {
        assignedFieldsState.bankAccounts.forEach((b, i) => {
          b.displayFields = getDisplayFields(
            action.payload.currencies,
            b.fields[`isUKBankAccount${i + 1}`].value,
            b.fields[`bankAccountCurrency${i + 1}`].value
          );
        });

        return {
          ...assignedFieldsState,
          currencies: action.payload.currencies
        };
      } else {
        const ukCurrency = action.payload.currencies.find(
          c => c.currencyCode.toLowerCase() === "gbp"
        );
        // const currency = ukCurrency.id;
        // : assignedFieldsState.bankAccounts[0].fields.bankAccountCurrency1
        //     .value;

        const newFields = {
          ...assignedFieldsState.bankAccounts[0].fields,
          isUKBankAccount1: {
            ...assignedFieldsState.bankAccounts[0].fields["isUKBankAccount1"],
            value: true
          },
          bankAccountCurrency1: {
            ...assignedFieldsState.bankAccounts[0].fields[
              "bankAccountCurrency1"
            ],
            value: ukCurrency.id
          }
        };
        assignedFieldsState.bankAccounts[0].fields = { ...newFields };
        assignedFieldsState.bankAccounts[0].displayFields = getDisplayFields(
          action.payload.currencies,
          true,
          ukCurrency.id
        );

        return {
          ...assignedFieldsState,
          bankAccounts: [...assignedFieldsState.bankAccounts],
          currencies: action.payload.currencies
        };
      }
    }

    case SAVE_ACCOUNTS_SUCCESS: {
      let assignedValuesState = processSaveResponse(
        state,
        action,
        "bankAccounts"
      );

      for (let i = 0; i < assignedValuesState.repetitions; i++) {
        assignedValuesState.bankAccounts[i].displayFields = getDisplayFields(
          state.currencies,
          assignedValuesState.bankAccounts[i].fields[`isUKBankAccount${i + 1}`]
            .value,
          assignedValuesState.bankAccounts[i].fields[
            `bankAccountCurrency${i + 1}`
          ].value
        );
      }

      return assignedValuesState;
    }

    case SELECT_DISPLAY_FIELDS: {
      const { currencies, isUkBankAccount, currencyId, index } = action.payload;

      const accToUpdate = state.bankAccounts[index - 1];

      const displayFields = getDisplayFields(
        currencies,
        isUkBankAccount,
        currencyId
      );

      return {
        ...state,
        bankAccounts: [
          ...state.bankAccounts.slice(0, index - 1),
          { ...accToUpdate, displayFields: displayFields },
          ...state.bankAccounts.slice(index)
        ]
      };
    }

    case ADD_BANK_ACCOUNT: {
      const newState = addListItem(
        state,
        { payload: { currentValues: action.payload.currentValues } },
        "bankAccounts"
      );

      const ukCurrency = action.payload.currencies.find(
        c => c.currencyCode.toLowerCase() === "gbp"
      );

      const newFields = {
        ...newState.bankAccounts[1].fields,
        isUKBankAccount2: {
          ...newState.bankAccounts[1].fields["isUKBankAccount2"],
          value: true
        },
        bankAccountCurrency2: {
          ...newState.bankAccounts[1].fields["bankAccountCurrency2"],
          value: ukCurrency.id
        }
      };
      newState.bankAccounts[1].fields = { ...newFields };
      newState.bankAccounts[1].displayFields = getDisplayFields(
        action.payload.currencies,
        true,
        ukCurrency.id
      );

      return newState;
    }

    case REMOVE_BANK_ACCOUNT: {
      return removeListItem(state, action, "bankAccounts");
    }
    default:
      return state;
  }

  function getDisplayFields(currencies, isUkBankAccount, currencyId) {
    const currency = currencies.find(c => c.id === currencyId);
    var newDisplayFields = [];

    if (!currency) return [];

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
