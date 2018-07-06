import reducer from "./dashboard-reducer";
import {
  DASHBOARD_FETCH_SUCCESS,
  TOGGLE_DASHBAORD_ITEM
} from "../actions/dashboard-action-types";

describe("Dashboard Reducer", () => {
  it("should return the initial state on default action", () => {
    const result = reducer();
    expect(result).toEqual({
      groups: [],
      loadComplete: false
    });
  });

  it("should mark the section as complete if all subsections are  complete", () => {
    const result = reducer(undefined, {
      type: DASHBOARD_FETCH_SUCCESS,
      payload: {
        percentage: 9,
        groups: [
          {
            key: "g1",
            sections: [
              {
                key: "s1",
                subsections: [{ key: "ss1", complete: true }, { key: "ss2" }]
              },
              { key: "s2" },
              { key: "s3" }
            ]
          },
          { key: "g2", sections: [] }
        ]
      }
    });

    const firstGroup = result.groups.find(s => s.key === "g1");
    expect(firstGroup.complete).toBe(false);

    expect(firstGroup.expanded).toBeTruthy();

    const s1 = firstGroup.sections.find(s => s.key === "s1");
    expect(s1.complete).toBeFalsy();
    expect(s1.expanded).toBeTruthy();
  });

  it("should set expanded true to group", () => {
    const result = reducer(
      {
        percentage: 9,
        groups: [
          {
            key: "g1",
            sections: [
              {
                key: "s1",
                subsections: [{ key: "ss1", complete: true }, { key: "ss2" }]
              },
              { key: "s2" },
              { key: "s3" }
            ]
          },
          { key: "g2", sections: [] }
        ]
      },
      {
        type: TOGGLE_DASHBAORD_ITEM,
        payload: { groupKey: "g1" }
      }
    );

    expect(result).toEqual({
      percentage: 9,
      groups: [
        {
          key: "g1",
          expanded: true,
          sections: [
            {
              key: "s1",
              subsections: [{ key: "ss1", complete: true }, { key: "ss2" }]
            },
            { key: "s2" },
            { key: "s3" }
          ]
        },
        { key: "g2", sections: [] }
      ]
    });
  });

  it("should set expanded true to section with in the group", () => {
    const result = reducer(
      {
        percentage: 9,
        groups: [
          {
            key: "g1",
            expanded: true,
            sections: [
              {
                key: "s1",
                subsections: [{ key: "ss1", complete: true }, { key: "ss2" }]
              },
              { key: "s2" },
              { key: "s3" }
            ]
          },
          { key: "g2", sections: [] }
        ]
      },
      {
        type: TOGGLE_DASHBAORD_ITEM,
        payload: { groupKey: "g1", sectionKey: "s1" }
      }
    );

    expect(result).toEqual({
      percentage: 9,
      groups: [
        {
          key: "g1",
          expanded: true,
          sections: [
            {
              key: "s1",
              expanded: true,
              subsections: [{ key: "ss1", complete: true }, { key: "ss2" }]
            },
            { key: "s2" },
            { key: "s3" }
          ]
        },
        { key: "g2", sections: [] }
      ]
    });
  });

  it("should keep the state as it is if groupKey not found", () => {
    const state = {
      percentage: 9,
      groups: [
        {
          key: "g1",
          sections: [
            {
              key: "s1",
              subsections: [{ key: "ss1", complete: true }, { key: "ss2" }]
            },
            { key: "s2" },
            { key: "s3" }
          ]
        },
        { key: "g2", sections: [] }
      ]
    };

    const result = reducer(state, {
      type: TOGGLE_DASHBAORD_ITEM,
      payload: { groupKey: "abcd" }
    });

    expect(result).toEqual(state);
  });

  it("should keep the state as it is if groupKey not found", () => {
    const state = {
      percentage: 9,
      groups: [
        {
          key: "g1",
          sections: [
            {
              key: "s1",
              subsections: [{ key: "ss1", complete: true }, { key: "ss2" }]
            },
            { key: "s2" },
            { key: "s3" }
          ]
        },
        { key: "g2", sections: [] }
      ]
    };

    const result = reducer(state, {
      type: TOGGLE_DASHBAORD_ITEM,
      payload: { groupKey: "abcd", sectionKey: "s1" }
    });

    expect(result).toEqual(state);
  });
});
