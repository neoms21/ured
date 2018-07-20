import httpProxy from "../../utils/httpProxy";

import { push } from "react-router-redux";
import { SAVE_REVIEW_SUCCESS, FETCH_REVIEW_SUCCESS } from "./wizard-action-types";

export function getReview() {
  return dispatch => {
    return httpProxy
      .get("dashboard/review")
      .then(response => {
        dispatch({
          type: FETCH_REVIEW_SUCCESS,
          payload: response.data.fields
        });

        dispatch(push(response.data.fields[0].page));
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function saveReview(field) {
  return (dispatch, getState) => {
    console.log(field);
    console.log(getState().wizard);

    return httpProxy
      .get("dashboard/saveReview")
      .then(response => {
        dispatch({
          type: SAVE_REVIEW_SUCCESS,
          payload: response.data.fields
        });

        // dispatch(push("about-you/personal"));
      })
      .catch(err => {
        console.error(err);
      });
  };
}
