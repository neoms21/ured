
import { CLOSE_WIZARD, SAVE_REVIEW_SUCCESS, FETCH_REVIEW_SUCCESS } from "./wizard-action-types";

const initialState = {
  reviewFields: []
};

function about(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_REVIEW_SUCCESS: {
      return {
        ...state,
        reviewFields: action.payload,
        fieldBeingProcessed: action.payload[0] ? action.payload[0].name : ""
      };
    }

    case SAVE_REVIEW_SUCCESS: {
      return {
        ...state,
        reviewFields: [{ name: "occupation", page: "about-you/personal" }],
        fieldBeingProcessed: "occupation"
      };
    }

    case CLOSE_WIZARD: {
      return initialState;
    }
    default:
      return state;
  }
}

export default about;
