import { FETCH_LISTS_SUCCESS } from "./../../actions/action-types";

const initialState = {};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_LISTS_SUCCESS: {
      const keys = Object.keys(action.payload);
      const newLists = {};
      keys.forEach(k => {
        newLists[k] = action.payload[k] ? action.payload[k] : state.lists[k];
      });
      return { ...state, ...newLists };
    }

    default:
      return state;
  }
}
