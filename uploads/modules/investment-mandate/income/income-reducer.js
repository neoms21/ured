import {
  FETCH_PORTFOLIO_INCOME_SUCCESS,
  SAVE_PORTFOLIO_INCOME_SUCCESS,
  ADD_REGULAR_PAYMENT,
  REMOVE_REGULAR_PAYMENT,
  REMOVE_ALL_PAYMENTS,
  TOGGLE_INCOME_REQUIREMENTS,
  TOGGLE_INCOME_SEPARATE
} from "./income-action-types";
import {
  assignValuesToFields,
  assignListFields,
  addListItem,
  removeListItem
} from "../../reducers-helper";
import { FETCH_ACCOUNTS_SUCCESS } from "../../banks/bank-accounts-action-types";

const initialState = {
  fieldNames: [],
  dataLoaded: false,
  fields: {},
  portfolioRegularPayments: [],
  maxRepeats: 5,
  nonListFields: [
    "portfolioIncomeSeparate",
    "portfolioManageIncome",
    "portfolioIncomeRequired",
    "portfolioWithdrawals",
    "portfolioManageIncomeBankAccountId",
    "portfolioOtherIncomeRequirements",
    "portfolioRegularPayments",
    "portfolioOtherIncomeRequirementsDetail",
    "portfolioWithdrawals"
  ]
};

export default function income(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_PORTFOLIO_INCOME_SUCCESS: {
      // console.log(assignListFields(state, action, "portfolioRegularPayments"))
      return assignListFields(state, action, "portfolioRegularPayments");
    }

    case SAVE_PORTFOLIO_INCOME_SUCCESS: {
      return assignValuesToFields(state, action);
    }

    case FETCH_ACCOUNTS_SUCCESS: {
      const { bankAccounts } = action.payload.accounts.data;
      let result = [];

      bankAccounts.forEach(b => {
        result.push({ id: b.entityId, value: getBankDisplayValue(b) });
      });

      if (result.length < 2) {
        result.push({ id: "add", value: "Add a nominated bank account" });
      }
      return { ...state, bankAccounts: result };
    }

    case ADD_REGULAR_PAYMENT: {
      return addListItem(state, action, "portfolioRegularPayments");
    }

    case REMOVE_REGULAR_PAYMENT: {
      return removeListItem(state, action, "portfolioRegularPayments");
    }

    case REMOVE_ALL_PAYMENTS: {
      const filteredRegularPayments = state.portfolioRegularPayments
        .filter(d => d.entityId)
        .map(d => {
          return { ...d, delete: true };
        });

      return {
        ...state,
        portfolioRegularPayments: [...filteredRegularPayments],
        repetitions: 0,
        fields: {
          ...state.fields
          // hasDependants: { ...state.fields["hasDependants"], value: false }
        }
      };
    }

    case TOGGLE_INCOME_REQUIREMENTS: {
      const { currentValues, answer } = action.payload;

      return toggleAndRehydrateFromCurrentValues(
        state,
        currentValues,
        "portfolioOtherIncomeRequirements",
        answer,
        ["portfolioOtherIncomeRequirementsDetail"]
      );
    }

    case TOGGLE_INCOME_SEPARATE: {
      const { currentValues, answer } = action.payload;

      return toggleAndRehydrateFromCurrentValues(
        state,
        currentValues,
        "portfolioIncomeSeparate",
        answer,
        ["portfolioManageIncome", "portfolioManageIncomeBankAccountId"]
      );
    }
    default:
      return state;
  }
}

function getBankDisplayValue(acc) {
  const names = acc.bankAccountName ? acc.bankAccountName.split(" ") : ["", ""];

  const finalValue =
    `${getStringValue(acc.bankAccountProvider)}` +
    ` ${getStringValue(acc.bankAccountNumber)},` +
    ` ${
      !names[1] ? names[0].trim() : getStringValue(names[0].substr(0, 1))
    } ${getStringValue(names[1])}`;
  return finalValue === " ,  " ? "" : finalValue.trim();
}

function getStringValue(str) {
  return str ? str.trim() : "";
}

function toggleAndRehydrateFromCurrentValues(
  state,
  currentValues,
  toggleField,
  answer,
  fieldsToProcess = []
) {
  let newFields = {},
    listFields = {};

  const listContainerFields = Object.keys(state.fields).filter(
    f => state.fields[f].fields !== undefined
  );

  listContainerFields.forEach(lf => {
    let arr = [];
    for (let i = 1; i <= state.repetitions; i++) {
      let x = { fields: {}, entityId: state[lf][i - 1].entityId };
      state.fields[lf].fields.forEach(field => {
        const prop = `${field}${i}`;
        x = {
          ...x,
          fields: {
            ...x.fields,
            [prop]: {
              ...state.schema[field],
              value: currentValues[prop],
              key: field + i
            }
          }
        };
      });

      arr.push(x);
    }
    listFields = { ...listFields, [lf]: arr };
  });

  Object.keys(state.fields).forEach(fieldName => {
    newFields = {
      ...newFields,
      [fieldName]: {
        ...state.fields[fieldName],
        value: currentValues[fieldName]
      }
    };
  });

  newFields = {
    ...newFields,
    [toggleField]: {
      ...state.fields[toggleField],
      value: answer
    }
  };

  fieldsToProcess.forEach(f => {
    newFields = {
      ...newFields,
      [f]: {
        ...state.fields[f],
        value: answer ? state.fields[f].value : currentValues[f],
        delete: answer ? undefined : true
      }
    };
  });

  return { ...state, fields: { ...newFields }, ...listFields };
}
