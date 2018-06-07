import {
  SET_ACTIVE_TRACKER_ITEM,
  SET_SUB_HEADER,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_FAILURE
} from "./action-types";
import httpProxy from "../utils/httpProxy";
import { push } from "react-router-redux";

import converter from "./../utils/list-converter";
import { pageSaved } from "../modules/tracker/tracker-actions";
export function setSubHeader(title, showStatus) {
  return {
    type: SET_SUB_HEADER,
    payload: { title, showStatus }
  };
}

export function setActiveTrackerItem(path) {
  return {
    type: SET_ACTIVE_TRACKER_ITEM,
    payload: path
  };
}

export function wrapperAction(type, payload) {
  return { type, payload };
}

export function fetchFields(pageKey, successActionType, failureActionType) {
  return dispatch => {
    //dispatch(itemsIsLoading(true));
    return httpProxy
      .read(pageKey)
      .then(response => {
        dispatch(wrapperAction(successActionType, response.data));
      })
      .catch(err => {
        console.error(err);
        dispatch(wrapperAction(failureActionType, err));
      });
  };
}

export function fetchRefData(lists, successActionType, failureActionType) {
  return dispatch => {
    //dispatch(itemsIsLoading(true));
    return httpProxy
      .getRefData(lists.join(","))
      .then(response => {
        dispatch(wrapperAction(FETCH_LISTS_SUCCESS, response.data));
      })
      .catch(err => {
        dispatch(wrapperAction(FETCH_LISTS_FAILURE, err));
      });
  };
}

export function saveFields(
  requestBody,
  successActionType,
  failureActionType,
  pushToRoute
) {
  return dispatch => {
    //dispatch(itemsIsLoading(true));
    if (requestBody.data) {
      let newObj = { data: {}, page: requestBody.page };
      Object.keys(requestBody.data).forEach(f => {
        newObj.data[f] =
          requestBody.data[f] === undefined ? null : requestBody.data[f];
      });
      return httpProxy
        .write(newObj)
        .then(res => {
          dispatch(pageSaved(requestBody.page, res.data.complete));
          if (pushToRoute) {
            dispatch(push(pushToRoute));
          }
          dispatch(wrapperAction(successActionType, requestBody.data));
        })
        .catch(err => {
          dispatch(wrapperAction(failureActionType, err));
        });
    }
  };
}

export function saveListFields(
  data,
  keys,
  page,
  stateItems,
  successActionType,
  failureActionType,
  pushToRoute,
  listName,
  nonListFields
) {
  return dispatch => {
    //dispatch(itemsIsLoading(true));
    const reqData = converter(data, keys, stateItems, nonListFields, listName);
    console.log(reqData);

    let newObj = {
      data: reqData,
      page
    };

    return httpProxy
      .write(newObj)
      .then(response => {
        dispatch(pageSaved(page, response.data.complete));
        if (pushToRoute) {
          dispatch(push(pushToRoute));
        }
        dispatch(
          wrapperAction(successActionType, {
            request: reqData,
            entityIds: response.data.entityIds
          })
        );
      })
      .catch(err => {
        console.error(err);
        dispatch(wrapperAction(failureActionType, err));
      });
  };
}
