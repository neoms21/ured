import {
  HIDE_TRACKER,
  PAGES_FETCH_SUCCESS,
  SET_ACTIVE_TRACKER_BY_PAGE,
  SHOW_TRACKER,
  WINDOW_SIZE,
  HIDE_TRACKER_ITEMS,
  SHOW_TRACKER_ITEMS,
  PAGE_SAVED
} from "./tracker-action-types";
import * as _ from "lodash";
import { SET_ACTIVE_TRACKER_ITEM } from "../../actions/action-types";

const initialState = {
  pages: [],
  key: "",
  pagesLoaded: false,
  showTracker: true,
  activePage: ""
};

export default function header(state = initialState, action = "") {
  switch (action.type) {
    case PAGES_FETCH_SUCCESS: {
      const key = action.payload.key;
      _.each(action.payload.data.pages, page => {
        page.route = `/${key}/${page.key}`;
      });

      return {
        ...state,
        pages: action.payload.data.pages,
        context: action.payload.data.context,
        key: key,
        pagesLoaded: true
      };
    }

    case HIDE_TRACKER: {
      return { ...state, showTracker: false, showHeaderTracker: false };
    }

    case WINDOW_SIZE: {
      return {
        ...state,
        showHeaderTracker: action.payload < 992,
        showTracker: action.payload > 992
      };
    }

    case SHOW_TRACKER: {
      return {
        ...state,
        showTracker: action.payload > 992,
        showHeaderTracker: false
      };
    }

    case SET_ACTIVE_TRACKER_ITEM: {
      const pageByKey = _.find(state.pages, p => p.key === action.payload);
      return { ...state, activePage: pageByKey ? pageByKey.route : "" };
    }

    case SET_ACTIVE_TRACKER_BY_PAGE: {
      return { ...state, activePage: action.payload };
    }

    case HIDE_TRACKER_ITEMS: {
      const newPages = [];
      const pagesToHide = action.payload;
      state.pages.forEach(p => {
        const newPage = { ...p, hidden: pagesToHide.indexOf(p.key) !== -1 };
        newPages.push(newPage);
      });

      return { ...state, pages: newPages };
    }

    case SHOW_TRACKER_ITEMS: {
      const newPages = [];
      state.pages.forEach(p => {
        const newPage = { ...p, hidden: false };
        newPages.push(newPage);
      });

      return { ...state, pages: newPages };
    }

    case PAGE_SAVED: {
      const { page, status } = action.payload;

      const keyPage = state.pages.find(p => p.key === page);
      if (!keyPage) return state;

      const pageIndex = state.pages.indexOf(keyPage);
      const newPages = [
        ...state.pages.slice(0, pageIndex),
        { ...keyPage, complete: status },
        ...state.pages.slice(pageIndex + 1, state.pages.length)
      ];

      return { ...state, pages: newPages };
    }

    default:
      return state;
  }
}
