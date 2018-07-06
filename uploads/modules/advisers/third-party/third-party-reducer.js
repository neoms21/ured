import {
  FETCH_THIRD_PARTY_SUCCESS,
  SAVE_THIRD_PARTY_SUCCESS
} from "./third-party-action-types";
import { assignFields, assignValuesToFields } from "../../reducers-helper";

const initialState = {
  dataLoaded: false,
  fields: {}
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_THIRD_PARTY_SUCCESS: {
      return assignFields(state, action);
    }
    case SAVE_THIRD_PARTY_SUCCESS: {
      return assignValuesToFields(state, action);
    }
    default:
      return state;
  }
}
