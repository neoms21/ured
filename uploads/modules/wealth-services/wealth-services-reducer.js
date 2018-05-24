import {
  FETCH_WEALTH_SUCCESS,
  SAVE_WEALTH_SUCCESS,
  CLEAR_OTHER_WEALTH_OBJECTIVE
} from "./wealth-services-action-types";
import {
  assignFields,
  assignValuesToFields,
  selectObjectives
} from "../reducers-helper";

const initialState = {
  fieldNames: [],
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
    case FETCH_WEALTH_SUCCESS: {
      const newState = assignFields(state, action);

      return {
        ...newState,
        objectives: selectObjectives(newState, "wealthPlanningObjectives")
      };
    }

    case SAVE_WEALTH_SUCCESS: {
      const assignedState = assignValuesToFields(state, action);

      return {
        ...assignedState,
        objectives: selectObjectives(assignedState, "wealthPlanningObjectives")
      };
    }

    case CLEAR_OTHER_WEALTH_OBJECTIVE: {
      return {
        ...state,
        fields: {
          ...state.fields,
          otherWealthPlanningObjective: {
            ...state.fields["otherWealthPlanningObjective"],
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
