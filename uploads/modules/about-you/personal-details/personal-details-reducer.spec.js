import reducer from "./personal-details-reducer";
import types from "./actions/personal-details-action-types";
import { FETCH_REVIEW_SUCCESS } from "../../../actions/action-types";

describe("personal details Reducer", () => {
  it("should return the initial state on default action", () => {
    const result = reducer();
    expect(result).toEqual({
      fieldNames: [],
      dataLoaded: false,
      saved: false,
      dates: ["dateOfBirth"],
      key: "firstName",
      fields: {}
    });
  });

  it("should map the fetched data", () => {
    const state = {
      fieldNames: [],
      key: "firstName",
      fields: {}
    };
    const result = reducer(state, {
      type: types.FETCH_PERSONAL_DATA_SUCCESS,
      payload: {
        schema: {
          a: { label: "a label", xyz: "abc", type: "text" },
          b: { label: "b label", xyz: "abc", type: "text" },
          c: { label: "c label", xyz: "abc", type: "date" },
          firstName: { label: "fn label", xyz: "abc", type: "text" },
          d: { label: "d label", xyz: "abc", type: "text" }
        },
        data: {
          a: "a1",
          b: "b1",
          c: "2013-12-01",
          firstName: "Kian"
        }
      }
    });
    expect(result).toEqual({
      fieldNames: ["a", "b", "c", "firstName", "d"],
      schema: {
        a: { label: "a label", xyz: "abc", type: "text" },
        b: { label: "b label", xyz: "abc", type: "text" },
        c: { label: "c label", xyz: "abc", type: "date" },
        firstName: { label: "fn label", xyz: "abc", type: "text" },
        d: { label: "d label", xyz: "abc", type: "text" }
      },
      fields: {
        a: {
          value: "a1",
          type: "text",
          key: "a",
          xyz: "abc",
          label: "a label"
        },
        b: {
          value: "b1",
          type: "text",
          key: "b",
          xyz: "abc",
          label: "b label"
        },
        c: {
          value: "01/12/2013",
          key: "c",
          type: "date",
          xyz: "abc",
          label: "c label"
        },
        firstName: {
          label: "fn label",
          value: "Kian",
          key: "firstName",
          type: "text",
          xyz: "abc"
        },
        d: {
          label: "d label",
          value: undefined,
          key: "d",
          type: "text",
          xyz: "abc"
        }
      },
      key: "firstName",
      dataLoaded: true
    });
  });

  it("should execute review action", () => {
    const state = {
      fieldNames: ["a", "b", "c", "firstName", "d"],
      schema: {
        a: { label: "a label", xyz: "abc", type: "text" },
        b: { label: "b label", xyz: "abc", type: "text" },
        c: { label: "c label", xyz: "abc", type: "date" },
        firstName: { label: "fn label", xyz: "abc", type: "text" },
        d: { label: "d label", xyz: "abc", type: "text" }
      },
      fields: {
        a: {
          value: "a1",
          type: "text",
          key: "a",
          xyz: "abc",
          label: "a label"
        },
        b: {
          value: "b1",
          type: "text",
          key: "b",
          xyz: "abc",
          label: "b label"
        },
        c: {
          value: "01/12/2013",
          key: "c",
          type: "date",
          xyz: "abc",
          label: "c label"
        },
        firstName: {
          label: "fn label",
          value: "Kian",
          key: "firstName",
          type: "text",
          xyz: "abc"
        },
        d: {
          label: "d label",
          value: undefined,
          key: "d",
          type: "text",
          xyz: "abc"
        }
      },
      key: "firstName",
      dataLoaded: true
    };

    const result = reducer(state, {
      type: FETCH_REVIEW_SUCCESS,
      payload: "firstName"
    });

    expect(result).toEqual({
      fieldNames: ["a", "b", "c", "firstName", "d"],
      schema: {
        a: { label: "a label", xyz: "abc", type: "text" },
        b: { label: "b label", xyz: "abc", type: "text" },
        c: { label: "c label", xyz: "abc", type: "date" },
        firstName: { label: "fn label", xyz: "abc", type: "text" },
        d: { label: "d label", xyz: "abc", type: "text" }
      },
      fields: {
        a: {
          value: "a1",
          type: "text",
          key: "a",
          xyz: "abc",
          label: "a label"
        },
        b: {
          value: "b1",
          type: "text",
          key: "b",
          xyz: "abc",
          label: "b label"
        },
        c: {
          value: "01/12/2013",
          key: "c",
          type: "date",
          xyz: "abc",
          label: "c label"
        },
        firstName: {
          label: "fn label",
          value: "Kian",
          key: "firstName",
          type: "text",
          xyz: "abc",
          inReview: true
        },
        d: {
          label: "d label",
          value: undefined,
          key: "d",
          type: "text",
          xyz: "abc"
        }
      },
      key: "firstName",
      dataLoaded: true
    });
  });
});
