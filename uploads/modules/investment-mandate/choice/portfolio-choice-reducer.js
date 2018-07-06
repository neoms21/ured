import {
  FETCH_CHOICE_SUCCESS,
  SAVE_CHOICE_SUCCESS,
  TOGGLE_RESTRICTION
} from "./portfolio-choice-action-types";
import { assignFields, assignValuesToFields } from "../../reducers-helper";
import toggleRehydrate from "../../../helpers/toggle-rehydrate";

const initialState = {
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

      const { answer, currentValues } = action.payload;

      return toggleRehydrate(
        state,
        currentValues,
        "applyPortfolioRestrictions",
        answer,
        ["portfolioRestrictions"]
      );
    }
    default:
      return state;
  }
}
