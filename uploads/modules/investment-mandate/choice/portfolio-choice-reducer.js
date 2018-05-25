import {
  FETCH_CHOICE_SUCCESS,
  SAVE_CHOICE_SUCCESS
} from "./portfolio-choice-action-types";
import { assignFields, assignValuesToFields } from "../../reducers-helper";

const initialState = {
  fieldNames: [],
  dataLoaded: false,
  fields: {}
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_CHOICE_SUCCESS: {
      return assignFields(state, action);
    }
    case SAVE_CHOICE_SUCCESS: {
      return assignValuesToFields(state, action);
    }
    default:
      return state;
  }
}
