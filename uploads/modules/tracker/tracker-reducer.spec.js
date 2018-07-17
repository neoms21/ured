import reducer from "./tracker-reducer";
import {
  PAGES_FETCH_SUCCESS,
  SET_ACTIVE_TRACKER_BY_PAGE,
  HIDE_TRACKER,
  WINDOW_SIZE,
  SHOW_TRACKER,
  HIDE_TRACKER_ITEMS,
  PAGE_SAVED,
  SHOW_TRACKER_ITEMS
} from "./tracker-action-types";
import { SET_ACTIVE_TRACKER_ITEM } from "../../actions/action-types";

describe("Tracker Reducer", () => {
  it("should return the initial state on default action", () => {
    const result = reducer();
    expect(result).toEqual({
      pages: [],
      key: "",
      pagesLoaded: false,
      showTracker: true,
      activePage: ""
    });
  });

  it("should return the sections on fetch success", () => {
    const result = reducer(undefined, {
      type: PAGES_FETCH_SUCCESS,
      payload: {
        data: { pages: [{ key: "r1" }, { key: "r2" }] },
        key: "key",
        activePage: ""
      }
    });
    expect(result).toEqual({
      activePage: "",
      key: "key",
      pages: [{ key: "r1", route: "/key/r1" }, { key: "r2", route: "/key/r2" }],
      pagesLoaded: true,
      showTracker: true
    });
  });

  it("should set active page", () => {
    const result = reducer(
      { pages: [], activePage: undefined },
      {
        type: SET_ACTIVE_TRACKER_BY_PAGE,
        payload: "abcd"
      }
    );
    expect(result).toEqual({
      activePage: "abcd",
      pages: []
    });
  });

  it("should hide the tracker", () => {
    const result = reducer(
      { pages: [] },
      {
        type: HIDE_TRACKER
      }
    );
    expect(result).toEqual({
      showTracker: false,
      showHeaderTracker: false,
      pages: []
    });
  });

  it("should set the active page", () => {
    const result = reducer(
      { pages: [{ key: "contact", route: "#/about-you/phone" }] },
      {
        type: SET_ACTIVE_TRACKER_ITEM,
        payload: "contact"
      }
    );
    expect(result.activePage).toEqual("#/about-you/phone");
  });

  it("should hide the header tracker and show the main one", () => {
    const result = reducer(
      { pages: [] },
      {
        type: WINDOW_SIZE,
        payload: 1000
      }
    );
    expect(result).toEqual({
      showTracker: true,
      showHeaderTracker: false,
      pages: []
    });
  });

  it("should show the header tracker and hdie the main one", () => {
    const result = reducer(
      { pages: [] },
      {
        type: WINDOW_SIZE,
        payload: 991
      }
    );
    expect(result).toEqual({
      showTracker: false,
      showHeaderTracker: true,
      pages: []
    });
  });

  it("should show tracker", () => {
    const result = reducer(
      { pages: [] },
      {
        type: SHOW_TRACKER,
        payload: 995
      }
    );
    expect(result).toEqual({
      showTracker: true,
      showHeaderTracker: false,
      pages: []
    });
  });

  it("should set the active tracker item", () => {
    const result = reducer(
      {
        pages: [
          { key: "r1", route: "/key/r1" },
          { key: "r2", route: "/key/r2" }
        ]
      },
      {
        type: SET_ACTIVE_TRACKER_ITEM,
        payload: "r2"
      }
    );
    expect(result).toEqual({
      activePage: "/key/r2",
      pages: [{ key: "r1", route: "/key/r1" }, { key: "r2", route: "/key/r2" }]
    });

    const resultEmptyPage = reducer(
      {
        pages: [
          { key: "r1", route: "/key/r1" },
          { key: "r2", route: "/key/r2" }
        ]
      },
      {
        type: SET_ACTIVE_TRACKER_ITEM,
        payload: "abcd"
      }
    );
    expect(resultEmptyPage).toEqual({
      activePage: "",
      pages: [{ key: "r1", route: "/key/r1" }, { key: "r2", route: "/key/r2" }]
    });
  });

  it("should mark the pages as hidden based on keys", () => {
    const result = reducer(
      {
        activePage: "/key/r2",
        pages: [
          { key: "r1", route: "/key/r1" },
          { key: "r2", route: "/key/r2" },
          { key: "r3", route: "/key/r2" },
          { key: "r4", route: "/key/r2" }
        ]
      },
      {
        type: HIDE_TRACKER_ITEMS,
        payload: ["r2", "r4"]
      }
    );
    expect(result).toEqual({
      activePage: "/key/r2",
      pages: [
        { key: "r1", route: "/key/r1", hidden: false },
        { key: "r2", route: "/key/r2", hidden: true },
        { key: "r3", route: "/key/r2", hidden: false },
        { key: "r4", route: "/key/r2", hidden: true }
      ]
    });
  });
  it("should mark the pages as not hidden", () => {
    const result = reducer(
      {
        activePage: "/key/r2",
        pages: [
          { key: "r1", route: "/key/r1" },
          { key: "r2", route: "/key/r2" },
          { key: "r3", route: "/key/r2" },
          { key: "r4", route: "/key/r2" }
        ]
      },
      {
        type: SHOW_TRACKER_ITEMS
      }
    );
    expect(result).toEqual({
      activePage: "/key/r2",
      pages: [
        { key: "r1", route: "/key/r1", hidden: false },
        { key: "r2", route: "/key/r2", hidden: false },
        { key: "r3", route: "/key/r2", hidden: false },
        { key: "r4", route: "/key/r2", hidden: false }
      ]
    });
  });

  it("should mark the page as complete when page is saved", () => {
    const result = reducer(
      {
        activePage: "/key/r2",
        pages: [
          { key: "r1", route: "/key/r1" },
          { key: "r2", route: "/key/r2" },
          { key: "r3", route: "/key/r2" },
          { key: "r4", route: "/key/r2" }
        ]
      },
      {
        type: PAGE_SAVED,
        payload: { page: "r2", status: true }
      }
    );
    expect(result).toEqual({
      activePage: "/key/r2",
      pages: [
        { key: "r1", route: "/key/r1" },
        { key: "r2", route: "/key/r2", complete: true },
        { key: "r3", route: "/key/r2" },
        { key: "r4", route: "/key/r2" }
      ]
    });
  });
});
