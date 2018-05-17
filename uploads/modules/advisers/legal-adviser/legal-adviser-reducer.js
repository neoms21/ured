import {
  FETCH_LEGAL_ADVISER_SUCCESS,
  SAVE_LEGAL_ADVISER_SUCCESS
} from "./legal-adviser-action-types";
import { assignFields, assignValuesToFields } from "../../reducers-helper";

const initialState = {
  fieldNames: [],
  dataLoaded: false,
  fields: {}
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_LEGAL_ADVISER_SUCCESS: {
      return assignFields(state, action);
    }
    case SAVE_LEGAL_ADVISER_SUCCESS: {
      return assignValuesToFields(state, action);
    }
    default:
      return state;
  }
}
