import { OPEN_MODAL, CLOSE_MODAL } from "./body-action-types";

export function openModal(component) {
  return {
    type: OPEN_MODAL,
    payload: { component }
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  };
}
