import {
  REMOVE_DEPENDANT,
  FETCH_DEPENDANTS_SUCCESS,
  ADD_DEPENDANT,
  SAVE_DEPENDANTS_SUCCESS,
  REMOVE_ALL_DEPENDANTS
} from "./dependants-action-types";
import {
  assignListFields,
  addListItem,
  removeListItem,
  processSaveResponse
} from "../../reducers-helper";
import { FETCH_LISTS_SUCCESS } from "./../../../actions/action-types";

const initialState = {
  fieldNames: [],
  dataLoaded: false,
  saved: false,
  fields: {},
  dependants: [],
  maxRepeats: 4,
  repetitions: 0,
  nonListFields: ["hasDependants"]
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_DEPENDANTS_SUCCESS: {
      return assignListFields(state, action, "dependants");
    }

    case SAVE_DEPENDANTS_SUCCESS: {
      return processSaveResponse(state, action, "dependants");
    }

    case ADD_DEPENDANT: {
      return addListItem(state, action, "dependants");
    }

    case REMOVE_DEPENDANT: {
      return removeListItem(state, action, "dependants");
    }

    case FETCH_LISTS_SUCCESS: {
      return {
        ...state,
        relationships: action.payload["dependantRelationships"]
      };
    }

    case REMOVE_ALL_DEPENDANTS: {
      const filteredDependants = state.dependants
        .filter(d => d.entityId)
        .map(d => {
          return { ...d, delete: true };
        });

      return { ...state, dependants: [...filteredDependants], repetitions: 0 };
    }
    default:
      return state;
  }
}
