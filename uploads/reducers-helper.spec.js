import { addListItem, removeListItem } from "./reducers-helper";

describe("Reducer helper tests", () => {
  it("should add and remove ignoring deleted items", () => {
    const state = {
      schema: { a: {}, b: {} },
      repetitions: 1,
      banks: [
        { fields: {} },
        {
          fields: { a2: { value: "a2" }, b2: { value: "b2" } },
          entityId: "1",
          delete: true
        }
      ]
    };
    const action = { payload: { currentValues: { a1: "123", b1: "222" } } };

    const result = addListItem(state, action, "banks");

    expect(result.banks.length).toEqual(3);
    expect(result).toEqual({
      schema: { a: {}, b: {} },
      repetitions: 2,
      banks: [
        {
          fields: {
            a1: { key: "a1", value: "123" },
            b1: { key: "b1", value: "222" }
          }
        },
        {
          fields: {
            a2: { key: "a2", value: undefined },
            b2: { key: "b2", value: undefined }
          }
        },
        {
          fields: {
            a2: { value: "a2" },
            b2: { value: "b2" }
          },
          entityId: "1",
          delete: true
        }
      ]
    });

    const removeResult = removeListItem(
      result,
      { payload: { index: 2, currentValues: {} } },
      "banks"
    );

      expect(removeResult).toEqual({
          schema: { a: {}, b: {} },
          repetitions: 1,
          banks: [
              {
                  fields: {
                      a1: { key: "a1", value: "123" },
                      b1: { key: "b1", value: "222" }
                  }
              },
              {
                  fields: {
                      a2: { value: "a2" },
                      b2: { value: "b2" }
                  },
                  entityId: "1",
                  delete: true
              }
          ]
      })
  });
});
