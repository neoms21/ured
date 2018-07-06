import { fetchAction, fetchResult, saveAction, saveResult } from "./defaults";

export default function(name, reducer, fetch, save, defaultState) {
  return {
    name,
    reducer,
    tests: [
      {
        action: fetchAction(fetch),
        input: {},
        result: fetchResult
      },

      {
        action: saveAction(save),
        input: {
          fieldNames: ["a", "b"],
          fields: { a: { key: "a" }, b: { key: "b" } },
          schema: { a: {}, b: {} }
        },
        result: saveResult
      },
      {
        action: {},
        input: undefined,
        result: defaultState ? defaultState : {
          dataLoaded: false,
          fields: {}
        }
      }
    ]
  };
}
