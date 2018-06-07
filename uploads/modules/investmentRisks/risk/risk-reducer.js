import {
  FETCH_RISK_DATA_SUCCESS,
  SAVE_RISK_DATA_SUCCESS,
  TOGGLE_CASH_RESERVES
} from "./risk-action-types";
import {
  assignFields,
  assignValuesToFields,
  selectObjectives
} from "../../reducers-helper";
import objectives from "../../../utils/objectives";

const initialState = {
  fieldNames: [],
  riskLevels: [],
  lists: {},
  fields: {},
  objectives: objectives,
  dataLoaded: false
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_RISK_DATA_SUCCESS: {
      const newState = assignFields(state, action);

      return {
        ...newState,
        objectives: newState.fields["investmentObjective"]
          ? selectObjectives(
              newState,
              newState.fields["investmentObjective"].value
            )
          : [...newState.objectives]
      };
    }

    case SAVE_RISK_DATA_SUCCESS: {
      const newState = assignValuesToFields(state, action);

      return {
        ...newState,
        objectives: newState.fields["investmentObjective"]
          ? selectObjectives(
              newState,
              newState.fields["investmentObjective"].value
            )
          : [...newState.objectives]
      };
    }

    case TOGGLE_CASH_RESERVES: {
      const { formValues, answer } = action.payload;
      return {
        ...state,
        fields: {
          ...state.fields,
          assetRankForUnexpectedExpenditure: {
            ...state.fields["assetRankForUnexpectedExpenditure"],
            value: answer
              ? undefined
              : formValues["assetRankForUnexpectedExpenditure"],
            delete: answer ? true : undefined
          },
          hasCashReserves: {
            ...state.fields["hasCashReserves"],
            value: answer
          },
          hasCashForCommitments: {
            ...state.fields["hasCashForCommitments"],
            value: formValues["hasCashForCommitments"]
          }
        }
      };
    }
    default:
      return state;
  }
}
