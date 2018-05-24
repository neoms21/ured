import {
  FETCH_RISK_DATA_SUCCESS,
  SAVE_RISK_DATA_SUCCESS,
  FETCH_RISK_LEVEL_SUCCESS,
  TOGGLE_OBJECTIVE,
  CLEAR_OTHER_OBJECTIVE
} from "./risk-action-types";
import { assignFields, assignValuesToFields } from "../../reducers-helper";
import { FETCH_LISTS_SUCCESS } from "../../../actions/action-types";

const initialState = {
  fieldNames: [],
  riskLevels: [],
  lists: {},
  fields: {},
  objectives: [
    { id: "1", text: "Income", value: "Income" },
    { id: "2", text: "Growth of capital", value: "Growth of capital" },
    { id: "3", text: "Tax minimisation", value: "Tax minimisation" },
    { id: "4", text: "Retirment", value: "Retirement" },
    { id: "5", text: "Safety", value: "Safety" },
    { id: "6", text: "Speculation", value: "Speculation" },
    { id: "other", text: "Other", value: "" }
  ],
  dataLoaded: false
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_RISK_DATA_SUCCESS: {
      let newObjectives = [];
      const newState = assignFields(state, action);

      if (newState.fields["investmentObjective"]) {
        const selectedObjectives = newState.fields["investmentObjective"].value
          ? newState.fields["investmentObjective"].value.split(",")
          : [];

        newObjectives = newState.objectives.map(o => {
          return {
            ...o,
            selected: selectedObjectives.indexOf(o.id) !== -1
          };
        });
      }

      return { ...newState, objectives: newObjectives };
    }

    case FETCH_LISTS_SUCCESS: {
      return { ...state, riskLevels: action.payload.riskLevel };
    }

    case SAVE_RISK_DATA_SUCCESS: {
      return assignValuesToFields(state, action);
    }

    case TOGGLE_OBJECTIVE: {
      const objById = state.objectives.find(o => o.id === action.payload);
      const existingIndex = state.objectives.indexOf(objById);

      return {
        ...state,
        objectives: [
          ...state.objectives.slice(0, existingIndex),
          { ...objById, selected: !objById.selected },
          ...state.objectives.slice(existingIndex + 1)
        ]
      };
    }

    case CLEAR_OTHER_OBJECTIVE: {
      return {
        ...state,
        fields: {
          ...state.fields,
          otherInvestmentObjective: {
            ...state.fields["otherInvestmentObjective"],
            value: undefined,
            deleted: true
          }
        }
      };
    }
    default:
      return state;
  }
}
