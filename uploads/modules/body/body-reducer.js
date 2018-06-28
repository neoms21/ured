import { OPEN_MODAL, CLOSE_MODAL } from "./body-action-types";

const initialState = {
  showModal: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        showModal: !state.showModal,
        component: action.payload.component
      };
    case CLOSE_MODAL: {
      return {
        ...state,
        showModal: !state.showModal,
        component: undefined
      };
    }
    default:
      return state;
  }
};
