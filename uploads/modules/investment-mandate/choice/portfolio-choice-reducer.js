import {
  FETCH_CHOICE_SUCCESS,
  SAVE_CHOICE_SUCCESS,
  TOGGLE_RESTRICTION
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

    case TOGGLE_RESTRICTION: {
      return {
        ...state,
        fields: {
          ...state.fields,
          portfolioRestrictions: {
            ...state.fields.portfolioRestrictions,
            delete: action.payload ? undefined : true,
            value: action.payload
              ? state.fields.portfolioRestrictions.value
              : undefined
          },
          applyPortfolioRestrictions: {
            ...state.fields.applyPortfolioRestrictions,
            value: action.payload.answer
          }
        }
      };
    }
    default:
      return state;
  }
}
