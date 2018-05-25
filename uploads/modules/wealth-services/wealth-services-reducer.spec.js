import reducer from "./wealth-services-reducer";
import {
  FETCH_WEALTH_SUCCESS,
  SAVE_WEALTH_SUCCESS,
  CLEAR_OTHER_WEALTH_OBJECTIVE
} from "./wealth-services-action-types";

describe("Wealth services Reducer", () => {
  it("should return the initial state on default action", () => {
    const result = reducer();
    expect(result).toEqual({
      fieldNames: [],
      fields: {},
      objectives: [
        { id: "1", text: "Income", value: "Income" },
        { id: "2", text: "Growth of capital", value: "Growth of capital" },
        { id: "3", text: "Tax minimisation", value: "Tax minimisation" },
        { id: "4", text: "Retirment", value: "Retirement" },
        { id: "5", text: "Safety", value: "Safety" },
        { id: "6", text: "Speculation", value: "Speculation" },
        { id: "other", text: "Other", value: "" }
      ],
      dataLoaded: false
    });
  });

  it("should map the objectives from string value if values are present", () => {
    const state = {
      fields: {},
      objectives: [
        { id: "1", value: "Income" },
        { id: "2", value: "Growth of capital" },
        { id: "3", value: "Tax minimisation" },
        { id: "4", value: "Retirement" },
        { id: "5", value: "Safety" },
        { id: "6", value: "Speculation" },
        { id: "other", value: "" }
      ],
      dataLoaded: false
    };
    const result = reducer(state, {
      type: FETCH_WEALTH_SUCCESS,
      payload: {
        schema: { wealthPlanningObjectives: { type: "text" } },

        data: {
          wealthPlanningObjectives: " Income , Growth of capital, retirement"
        }
      }
    });

    const selectedObjectives = result.objectives.filter(o => o.selected);

    expect(selectedObjectives.length).toEqual(3);
    expect(result.objectives).toEqual([
      { id: "1", value: "Income", selected: true },
      { id: "2", value: "Growth of capital", selected: true },
      { id: "3", value: "Tax minimisation" },
      { id: "4", value: "Retirement", selected: true },
      { id: "5", value: "Safety" },
      { id: "6", value: "Speculation" },
      { id: "other", value: "" }
    ]);
  });

  it("should map the objectives to other if not present in list", () => {
    const state = {
      fields: {},
      objectives: [
        { id: "1", value: "Income" },
        { id: "2", value: "Growth of capital" },
        { id: "3", value: "Tax minimisation" },
        { id: "4", value: "Retirement" },
        { id: "5", value: "Safety" },
        { id: "6", value: "Speculation" },
        { id: "other", value: "" }
      ],
      dataLoaded: false
    };
    const result = reducer(state, {
      type: FETCH_WEALTH_SUCCESS,
      payload: {
        schema: { wealthPlanningObjectives: { type: "text" } },

        data: {
          wealthPlanningObjectives:
            "Income,Growth of capital,retirement, abcd, 1234"
        }
      }
    });

    const selectedObjectives = result.objectives.filter(o => o.selected);
    expect(result.objectives.length).toEqual(7);
    expect(selectedObjectives.length).toEqual(4);
    expect(selectedObjectives).toEqual([
      { id: "1", value: "Income", selected: true },
      { id: "2", value: "Growth of capital", selected: true },
      { id: "4", value: "Retirement", selected: true },
      { id: "other", text:'Other', value: "abcd, 1234", selected: true }
    ]);
  });

  it("shouldn`t map the objectives if value not present", () => {
    const state = {
      fieldNames: [],
      fields: {},
      objectives: [
        { id: "1", value: "Income" },
        { id: "2", value: "Growth of capital" },
        { id: "3", value: "Tax minimisation" },
        { id: "4", value: "Retirement" },
        { id: "5", value: "Safety" },
        { id: "6", value: "Speculation" },
        { id: "other", value: "" }
      ],
      dataLoaded: false
    };
    const result = reducer(state, {
      type: FETCH_WEALTH_SUCCESS,
      payload: {
        schema: { wealthPlanningObjectives: { type: "text" } },

        data: { wealthPlanningObjectives: undefined }
      }
    });

    const selectedObjectives = result.objectives.filter(o => o.selected);

    expect(selectedObjectives.length).toEqual(0);
    expect(result.fieldNames).toEqual(["wealthPlanningObjectives"]);
  });

  it("should save the values after save successful in state", () => {
    const state = {
      objectives: [
        { id: "1", value: "Income" },
        { id: "2", value: "Growth of capital" },
        { id: "3", value: "Tax minimisation" },
        { id: "4", value: "Retirement" },
        { id: "5", value: "Safety" },
        { id: "6", value: "Speculation" },
        { id: "other", value: "" }
      ],
      fieldNames: [
        "hasWealthAdvice",
        "includeWealthPlanning",
        "requiredWealthService",
        "wealthPlanningObjectives"
      ],
      fields: {
        includeWealthPlanning: {},
        otherWealthPlanningObjective: {},
        requiredWealthService: {}
      }
    };

    const result = reducer(state, {
      type: SAVE_WEALTH_SUCCESS,
      payload: {
        includeWealthPlanning: true,
        requireWealthService: true,
        wealthPlanningObjectives: "income,retirement,safety"
      }
    });

    expect(result).toEqual({
      objectives: [
        { id: "1", value: "Income", selected: true },
        { id: "2", value: "Growth of capital" },
        { id: "3", value: "Tax minimisation" },
        { id: "4", value: "Retirement", selected: true },
        { id: "5", value: "Safety", selected: true },
        { id: "6", value: "Speculation" },
        { id: "other", value: "" }
      ],
      fieldNames: [
        "hasWealthAdvice",
        "includeWealthPlanning",
        "requiredWealthService",
        "wealthPlanningObjectives"
      ],
      fields: {
        includeWealthPlanning: { value: true },
        requiredWealthService: { value: undefined },
        hasWealthAdvice: { value: undefined },
        wealthPlanningObjectives: { value: "income,retirement,safety" }
      }
    });
  });
});
