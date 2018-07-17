import { push } from "react-router-redux";
import httpProxy from "../../utils/httpProxy";
import {
  HIDE_TRACKER,
  PAGES_FETCH_FAILURE,
  PAGES_FETCH_SUCCESS,
  SET_ACTIVE_TRACKER_BY_PAGE,
  SHOW_TRACKER,
  WINDOW_SIZE,
  HIDE_TRACKER_ITEMS,
  SHOW_TRACKER_ITEMS,
  PAGE_SAVED
} from "./tracker-action-types";

export function fetchPages(key, currentPage) {
  return dispatch => {
    //dispatch(itemsIsLoading(true));
    return httpProxy
      .get(`dashboard/${key}`)
      .then(response => {
        dispatch(pagesFetchSuccess(response.data, key));
        const pathToGo =
          response.data.pages && response.data.pages.length > 0
            ? `/${key}/${response.data.pages[0].key}`
            : "";

        if (!currentPage) {
          dispatch(push(pathToGo));
        } else {
          dispatch(setActivePageByRoute(currentPage));
        }
      })
      .catch(err => {
        dispatch(pagesFetchFailure(err));
      });
  };
}

function pagesFetchSuccess(data, key) {
  return {
    type: PAGES_FETCH_SUCCESS,
    payload: { data, key }
  };
}

function setActivePageByRoute(currentPage) {
  return {
    type: SET_ACTIVE_TRACKER_BY_PAGE,
    payload: currentPage
  };
}

function pagesFetchFailure(err) {
  return {
    type: PAGES_FETCH_FAILURE,
    payload: err
  };
}

export function showTracker(width) {
  return {
    type: SHOW_TRACKER,
    payload: width
  };
}

export function hideTracker() {
  return {
    type: HIDE_TRACKER
  };
}

export function broadcastWindowSize(size) {
  return {
    type: WINDOW_SIZE,
    payload: size
  };
}

export function hidePages(pages) {
  return {
    type: HIDE_TRACKER_ITEMS,
    payload: pages
  };
}

export function showPages(pages) {
  return {
    type: SHOW_TRACKER_ITEMS
  };
}

export function pageSaved(page, status) {
  return {
    type: PAGE_SAVED,
    payload: { page, status }
  };
}
