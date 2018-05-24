import { FETCH_LISTS_SUCCESS } from "../../../actions/action-types";
import {
  FETCH_SERVICE_SUCCESS,
  TOGGLE_OTHER_OBJECTIVE,
  TOGGLE_CUSTODIAN_ANSWER,
  TOGGLE_OBJECTIVE,
  SAVE_INVESTMENT_SERVICE_SUCCESS
} from "./invesetment-service-action-types";
import { assignFields, assignValuesToFields, selectObjectives } from "../../reducers-helper";

const initialState = {
  fieldNames: [],
  dataLoaded: false,
  fields: {},
  lists: {
    portfolioTypes: [],
    portfolioTimeHorizons: [],
    currencies: []
  },
  objectives: [
    { id: "1", text: "Income", value: "Income" },
    { id: "2", text: "Growth of capital", value: "Growth of capital" },
    { id: "3", text: "Tax minimisation", value: "Tax minimisation" },
    { id: "4", text: "Retirment", value: "Retirement" },
    { id: "5", text: "Safety", value: "Safety" },
    { id: "6", text: "Speculation", value: "Speculation" },
    { id: "other", text: "Other", value: "" }
  ]
};

export default function service(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_SERVICE_SUCCESS: {
      let assignedFieldsState = assignFields(state, action);

      // let newObjectives = [];
      // if (assignedFieldsState.fields["portfolioObjectives"]) {
      //   const selectedObjectives = assignedFieldsState.fields[
      //     "portfolioObjectives"
      //   ].value
      //     ? assignedFieldsState.fields["portfolioObjectives"].value.split(",")
      //     : [];

      //   newObjectives = assignedFieldsState.objectives.map(o => {
      //     return { ...o, selected: selectedObjectives.indexOf(o.id) !== -1 };
      //   });
      // } else {
      //   newObjectives = [...state.objectives];
      // }

      if (
        assignedFieldsState.fields["portfolioServiceType"] &&
        !assignedFieldsState.fields["portfolioServiceType"].value
      ) {
        assignedFieldsState = {
          ...assignedFieldsState,
          fields: {
            ...assignedFieldsState.fields,
            portfolioServiceType: {
              ...assignedFieldsState.fields.portfolioServiceType,
              value: "1"
            }
          }
        };
      }
      return {
        ...assignedFieldsState,
        objectives: selectObjectives(assignedFieldsState, "wealthPlanningObjectives"),
        custody: assignedFieldsState.fields[
          "requiresAlternativeExternalCustodian"
        ].value
          ? true
          : undefined
      };
    }

    case SAVE_INVESTMENT_SERVICE_SUCCESS: {
      return assignValuesToFields(state, action);
    }
    case FETCH_LISTS_SUCCESS: {
      const keys = Object.keys(state.lists);
      const newLists = {};
      keys.forEach(k => {
        newLists[k] = action.payload[k] ? action.payload[k] : state.lists[k];
      });

      return { ...state, lists: newLists };
    }

    case TOGGLE_OBJECTIVE: {
      const objById = state.objectives.find(o => o.id === action.payload);
      const existingIndex = state.objectives.indexOf(objById);
      const newObjectives = [
        ...state.objectives.slice(0, existingIndex),
        { ...objById, selected: !objById.selected },
        ...state.objectives.slice(existingIndex + 1)
      ];

      return {
        ...state,
        dirty: true,
        objectives: newObjectives,
        objStrings: newObjectives
          .filter(n => n.selected)
          .map(o => o.id)
          .join(",")
      };
    }

    case TOGGLE_OTHER_OBJECTIVE: {
      return { ...state, otherSelected: !state.otherSelected };
    }
    case TOGGLE_CUSTODIAN_ANSWER: {
      let newState = {};
      if (state.custody) {
        // It means that answer is going from true to false
        newState = {
          ...state,
          fields: {
            ...state.fields,
            requiresAlternativeExternalCustodian: {
              ...state.fields.requiresAlternativeExternalCustodian,
              value: undefined,
              delete: true
            }
          }
        };
      } else {
        newState = { ...state };
      }
      return { ...newState, custody: action.payload };
    }

    default:
      return state;
  }
}
