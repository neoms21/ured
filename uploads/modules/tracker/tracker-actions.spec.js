import { setActiveTrackerItem } from "../../actions/actions";
import { SET_ACTIVE_TRACKER_ITEM } from "../../actions/action-types";
import sinon from "sinon";
import httpProxy from "../../utils/httpProxy";
import {
  PAGES_FETCH_SUCCESS,
  PAGES_FETCH_FAILURE
} from "./tracker-action-types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fetchPages } from "./tracker-actions";

const middleWare = [thunk];
const mockStore = configureMockStore(middleWare);
describe("Tracker action unit tests", () => {
  let proxyStub;

  afterEach(() => {
    if (proxyStub) proxyStub.restore();
  });

  it("should return the set active tracker item", () => {
    const result = setActiveTrackerItem("path");
    expect(result).toEqual({ type: SET_ACTIVE_TRACKER_ITEM, payload: "path" });
  });

  it("creates PAGES_FETCH_SUCCESS when fetching pages", done => {
    proxyStub = sinon.stub(httpProxy, "get");
    proxyStub.returns(
      new Promise(function(resolve) {
        resolve({
          data: {
            context: "aa",
            pages: [{ key: "abc" }]
          }
        });
      })
    );

    const expectedActions = [
      {
        type: PAGES_FETCH_SUCCESS,
        payload: {
          data: {
            context: "aa",
            pages: [{ key: "abc" }]
          },
          key: "abc"
        }
      },
      {
        payload: { args: ["/abc/abc"], method: "push" },
        type: "@@router/CALL_HISTORY_METHOD"
      }
    ];

    const store = mockStore({ todos: [] });
    store.dispatch(fetchPages("abc")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it("creates PAGES_FETCH_FAILURE when fetching pages", done => {
    proxyStub = sinon.stub(httpProxy, "get");
    proxyStub.returns(
      new Promise(function(resolve, reject) {
        reject({
          error: "Error thrown"
        });
      })
    );

    const expectedActions = [
      {
        type: PAGES_FETCH_FAILURE,
        payload: { error: "Error thrown" }
      }
    ];

    const store = mockStore({ todos: [] });
    store.dispatch(fetchPages("abc")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it("creates PAGES_FETCH_SUCCESS with current page when fetching pages", done => {
    proxyStub = sinon.stub(httpProxy, "get");
    proxyStub.returns(
      new Promise(function(resolve) {
        resolve({
          data: {
            pages: [{ key: "abc" }]
          }
        });
      })
    );

    const expectedActions = [
      {
        payload: {
          data: {
            pages: [{ key: "abc" }]
          },
          key: "abc"
        },
        type: "PAGES_FETCH_SUCCESS"
      },
      { payload: "cur", type: "SET_ACTIVE_TRACKER_BY_PAGE" }
    ];

    const store = mockStore({ todos: [] });
    store.dispatch(fetchPages("abc", "cur")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it("shouldn't dispatch if pages collection is empty", (done) => {

    proxyStub = sinon.stub(httpProxy, "get");
    proxyStub.returns(
      new Promise(function(resolve) {
        resolve({
          data: {
            pages: []
          }
        });
      })
    );

    const expectedActions = [
      {
        type: PAGES_FETCH_SUCCESS,
        payload: {
          data: {
            
            pages: []
          },
          key: "abc"
        }
      },
      {
        payload: { args: [""], method: "push" },
        type: "@@router/CALL_HISTORY_METHOD"
      }
    ];

    const store = mockStore({ todos: [] });
    store.dispatch(fetchPages("abc")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
