import {
  FETCH_PORTFOLIO_INCOME_SUCCESS,
  ADD_REGULAR_PAYMENT,
  REMOVE_REGULAR_PAYMENT,
  REMOVE_ALL_PAYMENTS,
  TOGGLE_INCOME_REQUIREMENTS,
  TOGGLE_INCOME_SEPARATE,
  TOGGLE_REGULAR_PAYMENTS,
  HYDRATE_STATE_BEFORE_ACCOUNT
} from "./income-action-types";
import {
  assignListFields,
  addListItem,
  removeListItem
} from "../../reducers-helper";
import { FETCH_ACCOUNTS_SUCCESS } from "../../banks/bank-accounts-action-types";
import toggleRehydrate from "../../../helpers/toggle-rehydrate";
import toggleListAnswer from "../../../helpers/toggle-list-answer";
import { OPEN_MODAL, CLOSE_MODAL } from "../../body/body-action-types";
import { SAVE_ACCOUNTS_SUCCESS } from "./../../banks/bank-accounts-action-types";

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
      return assignListFields(
        state,
        action,
        "portfolioRegularPayments",
        action.payload.data["portfolioWithdrawals"]
      );
    }

    // case SAVE_PORTFOLIO_INCOME_SUCCESS: {
    //   return assignValuesToFields(state, action);
    // }

    case FETCH_ACCOUNTS_SUCCESS: {
      const { bankAccounts } = action.payload.accounts.data;
      let result = [];
      if (!bankAccounts) {
        return {
          ...state,
          bankAccounts: [{ id: "add", value: "Add a nominated bank account" }],
          accountsLoaded: true
        };
      }

      bankAccounts.forEach(b => {
        result.push({ id: b.entityId, value: getBankDisplayValue(b) });
      });

      if (result.length < 2) {
        result.push({ id: "add", value: "Add a nominated bank account" });
      }

      if (!state.bankAccountField) return { ...state, bankAccounts: result };


      const newState = {
        ...toggleRehydrate(
          state,
          undefined,
          state.bankAccountField,
          state.bankAccountId
        )
      };

      return {
        ...newState,
        bankAccounts: result,
        bankAccountField: "",
        bankAccountId: "",
        isListField: undefined
      };
    }

    case ADD_REGULAR_PAYMENT: {
      return addListItem(state, action, "portfolioRegularPayments", {
        portfolioWithdrawals: true
      });
    }

    case REMOVE_REGULAR_PAYMENT: {
      return removeListItem(state, action, "portfolioRegularPayments");
    }

    case REMOVE_ALL_PAYMENTS: {
      const { currentValues } = action.payload;

      let listFields = {};
      const lf = "portfolioRegularPayments";

      let arr = [];
      for (let i = 0; i < state[lf].length; i++) {
        let x = { fields: {}, entityId: state[lf][i].entityId };
        state.fields[lf].fields.forEach(field => {
          const prop = `${field}${i + 1}`;
          // console.log(state[lf]);
          x = {
            ...x,
            fields: {
              ...x.fields,
              [prop]: {
                ...state.schema[field],
                value: currentValues[prop],
                key: prop
              }
            },
            delete: true
          };
        });

        arr.push(x);
      }
      listFields = { ...listFields, [lf]: arr };

      // const filteredRegularPayments = state.portfolioRegularPayments
      //   // .filter(d => d.entityId)
      //   .map(d => {
      //     return { ...d, delete: true };
      //   });

      return {
        ...state,
        portfolioRegularPayments: [...arr],
        repetitions: 0,
        fields: {
          ...state.fields,
          portfolioWithdrawals: {
            ...state.fields["portfolioWithdrawals"],
            value: false
          }
        }
      };
    }

    case TOGGLE_INCOME_REQUIREMENTS: {
      const { currentValues, answer } = action.payload;

      return toggleRehydrate(
        state,
        currentValues,
        "portfolioOtherIncomeRequirements",
        answer,
        ["portfolioOtherIncomeRequirementsDetail"]
      );
    }

    case TOGGLE_INCOME_SEPARATE: {
      const { currentValues, answer } = action.payload;

      return toggleRehydrate(
        state,
        currentValues,
        "portfolioIncomeSeparate",
        answer,
        ["portfolioManageIncome", "portfolioManageIncomeBankAccountId"]
      );
    }

    case TOGGLE_REGULAR_PAYMENTS: {
      const { answer, currentValues } = action.payload;

      // const listName = "list";
      // const toggleField = "c";

      const deletedListItems = state.portfolioRegularPayments.filter(
        l => l.delete
      );

      if (!deletedListItems || deletedListItems.length === 0)
        return addListItem(state, action, "portfolioRegularPayments", {
          portfolioWithdrawals: true
        });
      else
        return toggleListAnswer(
          state,
          "portfolioRegularPayments",
          "portfolioWithdrawals",
          answer,
          deletedListItems,
          currentValues
        );
    }

    case HYDRATE_STATE_BEFORE_ACCOUNT: {
      return {
        ...toggleRehydrate(state, action.payload.currentValues),
        hydrate: true,
        bankAccountField: action.payload.fieldName
      };
    }

    case SAVE_ACCOUNTS_SUCCESS: {
      return { ...state, bankAccountId: action.payload.entityIds[0] };
    }

    case CLOSE_MODAL: {
      return {
        ...state,
        hydrate: false
      };
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

// function toggleAndRehydrateFromCurrentValues(
//   state,
//   currentValues,
//   toggleField,
//   answer,
//   fieldsToProcess = []
// ) {
//   let newFields = {},
//     listFields = {};

//   const listContainerFields = Object.keys(state.fields).filter(
//     f => state.fields[f].fields !== undefined
//   );

//   listContainerFields.forEach(lf => {
//     let arr = [];
//     for (let i = 1; i <= state.repetitions; i++) {
//       let x = { fields: {}, entityId: state[lf][i - 1].entityId };
//       state.fields[lf].fields.forEach(field => {
//         const prop = `${field}${i}`;
//         x = {
//           ...x,
//           fields: {
//             ...x.fields,
//             [prop]: {
//               ...state.schema[field],
//               value: currentValues[prop],
//               key: field + i
//             }
//           }
//         };
//       });

//       arr.push(x);
//     }
//     listFields = { ...listFields, [lf]: arr };
//   });

//   Object.keys(state.fields).forEach(fieldName => {
//     newFields = {
//       ...newFields,
//       [fieldName]: {
//         ...state.fields[fieldName],
//         value: currentValues[fieldName]
//       }
//     };
//   });

//   newFields = {
//     ...newFields,
//     [toggleField]: {
//       ...state.fields[toggleField],
//       value: answer
//     }
//   };

//   fieldsToProcess.forEach(f => {
//     newFields = {
//       ...newFields,
//       [f]: {
//         ...state.fields[f],
//         value: answer ? state.fields[f].value : currentValues[f],
//         delete: answer ? undefined : true
//       }
//     };
//   });

//   return { ...state, fields: { ...newFields }, ...listFields };
// }
