import types from "./actions/personal-details-action-types";
import { assignValuesToFields, assignFields } from "../../reducers-helper";

const initialState = {
  fieldNames: [],
  dataLoaded: false,
  saved: false,
  dates: ["dateOfBirth"],
  fields: {},
  key: "firstName",
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case types.FETCH_PERSONAL_DATA_SUCCESS: {
      return assignFields(state, action);
    }

    case types.SAVE_PERSONAL_DATA_SUCCESS: {
      return assignValuesToFields(state, action);
    }
    default:
      return state;
  }
}
