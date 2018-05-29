import { saveAccountant } from "./accountant-actions";
import sinon from "sinon";
import httpProxy from "../../../utils/httpProxy";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleWare = [thunk];
const mockStore = configureMockStore(middleWare);

describe("accountant actions specs", () => {
  let proxyStub;

  it("should modify the request for entity fields", done => {
    const data = {
      a: "a1",
      b: "b1",
      c: "c1",
      d: "c1",
      e: "c1",
      f: "c1",
      g: "c1"
    };

    proxyStub = sinon.stub(httpProxy, "write");
    proxyStub.returns(
      new Promise(function(resolve) {
        resolve({ data: { prop: "abc" } });
      })
    );
    const store = mockStore();
    store
      .dispatch(
        saveAccountant(data, "aa", [
          { name: "abc", fields: ["d", "e", "f", "g"] }
        ])
      )
      .then(() => {
        expect(proxyStub.getCall(0).args[0]).toEqual({
          data: {
            a: "a1",
            b: "b1",
            c: "c1",
            abc: {
              d: "c1",
              e: "c1",
              f: "c1",
              g: "c1"
            }
          },
          page: "aa"
        });
        done();
      });
  });
});
