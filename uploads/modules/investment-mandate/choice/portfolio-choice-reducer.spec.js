import { TOGGLE_RESTRICTION } from "./portfolio-choice-action-types";
import reducer from "./portfolio-choice-reducer";

describe("portfolio choice reducer tests", () => {
  it("should toggle the restrictions field and mark as deleted", () => {
    const state = {
      fields: {
        portfolioRestrictions: { value: true },
        applyPortfolioRestrictions: { value: true }
      }
    };

    const result = reducer(state, {
      type: TOGGLE_RESTRICTION,
      payload: { answer: false, currentValues: {} }
    });

    expect(result).toEqual({
      fields: {
        portfolioRestrictions: { value: undefined, delete: true },
        applyPortfolioRestrictions: { value: false }
      }
    });
  });

  it("should toggle the restrictions field and set as true", () => {
    const state = {
      fields: {
        portfolioRestrictions: { value: undefined },
        applyPortfolioRestrictions: { value: false }
      }
    };

    const result = reducer(state, {
      type: TOGGLE_RESTRICTION,
      payload: { answer: true, currentValues: {} }
    });

    expect(result).toEqual({
      fields: {
        portfolioRestrictions: { value: undefined, delete: undefined },
        applyPortfolioRestrictions: { value: true }
      }
    });
  });
});
