import {
  FETCH_WEALTH_SUCCESS,
  SAVE_WEALTH_SUCCESS,
} from "./wealth-services-action-types";
import {
  assignFields,
  assignValuesToFields,
  selectObjectives
} from "../reducers-helper";
import objectives from "../../utils/objectives";

const initialState = {
  fieldNames: [],
  fields: {},
  objectives: objectives,
  dataLoaded: false
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_WEALTH_SUCCESS: {
      const newState = assignFields(state, action);
      return {
        ...newState,
        objectives: newState.fields["wealthPlanningObjectives"]
          ? selectObjectives(
              newState,
              newState.fields["wealthPlanningObjectives"].value
            )
          : newState.objectives
      };
    }

    case SAVE_WEALTH_SUCCESS: {
      const assignedState = assignValuesToFields(state, action);

      return {
        ...assignedState,
        objectives: assignedState.fields["wealthPlanningObjectives"]
          ? selectObjectives(
              assignedState,
              assignedState.fields["wealthPlanningObjectives"].value
            )
          : assignedState.objectives
      };
    }

    default:
      return state;
  }
}
