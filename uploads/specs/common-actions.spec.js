import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { definitions } from "./action-definitions";
import sinon from "sinon";
import httpProxy from "../utils/httpProxy";

const middleWare = [thunk];
const mockStore = configureMockStore(middleWare);
describe("Fetch and save action tests", () => {
  let proxyStubRead, proxyStubWrite;

  it("fetches the schems and data", done => {
    const defs = definitions;

    defs.forEach(d => {
      console.log(`Running tests for ${d.name}`);
      if (proxyStubRead) proxyStubRead.restore();
      if (proxyStubWrite) proxyStubWrite.restore();

      proxyStubRead = sinon.stub(httpProxy, "read");
      proxyStubWrite = sinon.stub(httpProxy, "write");

      proxyStubRead.returns(
        new Promise(function(resolve) {
          resolve({ data: { schema: { l1: {}, l2: {} }, data: {} } });
        })
      );

      proxyStubWrite.returns(
        new Promise(function(resolve) {
          resolve({ data: {} });
        })
      );

      const expectedActions = [
        {
          type: d.fetchSuccessAction,
          payload: { schema: { l1: {}, l2: {} }, data: {} }
        },

        { payload: { page: "pk", status: undefined }, type: "PAGE_SAVED" },
        d.redirectAction,
        { payload: {}, type: d.saveSuccessAction }
      ];
      const store = mockStore();
      store.dispatch(d.fetchFn("pk"));

      store.dispatch(d.saveFn({}, "pk")).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
