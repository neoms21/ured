import {
  FETCH_INVESTMENTS_SUCCESS,
  SAVE_INVESTMENTS_SUCCESS,
  INVESTMENT_FORM_SET_PRISTINE,
  INVESTMENT_FORM_SET_DIRTY,
  INVESTMENT_CLEAR_FIELDS
} from "./investments-action-types";
import { assignFields, assignValuesToFields } from "../../reducers-helper";

const initialState = {
  
  dataLoaded: false,
  fields: {},
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_INVESTMENTS_SUCCESS: {
      return assignFields(state, action);
    }
    case SAVE_INVESTMENTS_SUCCESS: {
      return assignValuesToFields(state, action);
    }
    case INVESTMENT_FORM_SET_DIRTY: {
      return { ...state, formModified: true };
    }
    case INVESTMENT_FORM_SET_PRISTINE: {
      return { ...state, formModified: false };
    }

    case INVESTMENT_CLEAR_FIELDS: {
      let obj = {};

      const fieldNames = action.payload;

      fieldNames.forEach(f => {
        obj = {
          ...obj,
          [f]: { ...state.fields[f], value: undefined, delete: true }
        };
      });
      
      return {
        ...state,
        fields: {
          ...state.fields,
          ...obj
        }
      };
    }
    default:
      return state;
  }
}
