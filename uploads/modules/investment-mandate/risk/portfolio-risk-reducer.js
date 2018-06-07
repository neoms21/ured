import {
  FETCH_PORTFOLIO_RISK_SUCCESS,
  SAVE_PORTFOLIO_RISK_SUCCESS
} from "./action-types";
import { assignFields, assignValuesToFields } from "../../reducers-helper";

const initialState = {
  fieldNames: [],
  dataLoaded: false,
  fields: {},
  riskReturn: 3
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_PORTFOLIO_RISK_SUCCESS: {
      const assignedFieldsState = assignFields(state, action);

      return {
        ...assignedFieldsState,
        riskReturn: action.payload.data.riskReturn
      };
    }

    case SAVE_PORTFOLIO_RISK_SUCCESS: {
      return assignValuesToFields(state, action);
    }
    default:
      return state;
  }
}
