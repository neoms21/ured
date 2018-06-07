import { DASHBOARD_FETCH_SUCCESS } from "../actions/dashboard-action-types";
import { every } from "lodash";
const initialState = {
  sections: [],
  loadComplete: false
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case DASHBOARD_FETCH_SUCCESS: {
      return {
        ...state,
        sections: setCompletionStatus(action.payload.sections),
        loadComplete: true,
        percentage: action.payload.percentage
      };
    }

    default:
      return state;
  }
}

function setCompletionStatus(sections) {
  let newSections = [...sections];

  newSections.forEach(n => {
    n.complete =
      !n.subsections || n.subsections.length === 0
        ? false
        : every(n.subsections, s => s.complete);
  });

  return newSections;
}
