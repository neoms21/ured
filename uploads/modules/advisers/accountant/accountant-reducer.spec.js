import reducer from "./accountant-reducer";
import { FETCH_ACCOUNTANT_SUCCESS } from "./accountant-action-types";

describe("accountant reducer tests", () => {
  it("should convert from entity to flat list of fields", () => {
    const state = {
      fieldNames: [],
      dataLoaded: false,
      fields: {},
      entities: [
        {
          name: "abc",
          fields: ["entityField1", "entityField2", "entityField3"]
        }
      ]
    };

    const result = reducer(state, {
      type: FETCH_ACCOUNTANT_SUCCESS,
      payload: {
        data: {
          field1: "abc",
          field2: "def",
          field3: "rrr",
          abc: {
            entityField1: "ef1",
            entityField2: "ef2",
            entityField3: "ef3"
          }
        },
        schema: {
          field1: {},
          field2: {},
          field3: {},
          entityField1: {},
          entityField2: {},
          entityField3: {}
        }
      }
    });

    expect(result).toEqual({
      fieldNames: [
        "field1",
        "field2",
        "field3",
        "entityField1",
        "entityField2",
        "entityField3"
      ],

      dataLoaded: true,
      fields: {
        field1: { key: "field1", value: "abc" },
        field2: { key: "field2", value: "def" },
        field3: { key: "field3", value: "rrr" },
        entityField1: { key: "entityField1", value: "ef1" },
        entityField2: { key: "entityField2", value: "ef2" },
        entityField3: { key: "entityField3", value: "ef3" }
      },
      entities: [
        {
          name: "abc",
          fields: ["entityField1", "entityField2", "entityField3"]
        }
      ],
      schema: {
        field1: {},
        field2: {},
        field3: {},
        entityField1: {},
        entityField2: {},
        entityField3: {}
      }
    });
  });
});
