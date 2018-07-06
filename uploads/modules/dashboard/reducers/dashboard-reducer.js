import {
  DASHBOARD_FETCH_SUCCESS,
  TOGGLE_DASHBAORD_ITEM
} from "../actions/dashboard-action-types";
import { every } from "lodash";
import { replaceInArray } from "../../../utils/helper";

const initialState = {
  groups: [],
  loadComplete: false
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case DASHBOARD_FETCH_SUCCESS: {
      return {
        ...state,
        groups: setExpandedStatus(action.payload.groups),
        loadComplete: true,
        percentage: action.payload.percentage
      };
    }

    case TOGGLE_DASHBAORD_ITEM: {
      const { groupKey, sectionKey } = action.payload;
      let props = {};

      if (!sectionKey) {
        props = {
          expanded: true
        };
      } else {
        const groupToUpdate = state.groups.find(g => g.key === groupKey);
        props = {
          sections: replaceInArray(
            groupToUpdate ? groupToUpdate.sections : [],
            "key",
            sectionKey,
            {
              expanded: true
            }
          )
        };
      }

      return {
        ...state,
        groups: replaceInArray(state.groups, "key", groupKey, { ...props })
      };
    }

    default:
      return state;
  }
}

function setExpandedStatus(groups) {
  let result = [];

  groups.forEach(g => {
    let newSections = [...g.sections];

    newSections.forEach(n => {
      n.complete =
        n.subsections &&
        n.subsections.length > 0 &&
        n.subsections.filter(s => s.complete).length === n.subsections.length;
    });

    let firstIncompleteSection = newSections.find(
      n => !n.complete || n.complete === undefined
    );
    if (firstIncompleteSection) firstIncompleteSection.expanded = true;

    result.push({
      ...g,
      sections: newSections,
      complete: newSections.length > 0 && every(newSections, s => s.complete)
    });
  });

  let firstIncompleteGroup = result.find(r => !r.complete);
  firstIncompleteGroup.expanded = true;

  return result;
}
