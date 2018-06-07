import reducer from "./dashboard-reducer";
import { DASHBOARD_FETCH_SUCCESS } from "../actions/dashboard-action-types";

describe("Dashboard Reducer", () => {
  it("should return the initial state on default action", () => {
    const result = reducer();
    expect(result).toEqual({
      sections: [],
      loadComplete: false
    });
  });

  it("should return the sections on fetch success", () => {
    const result = reducer(undefined, {
      type: DASHBOARD_FETCH_SUCCESS,
      payload: { sections: [{}, {}], percentage: 20 }
    });
    expect(result).toEqual({
      sections: [{ complete: false }, { complete: false }],
      percentage: 20,
      loadComplete: true
    });
  });

  it("should mark the section as complete if all subsections are  complete", () => {
    const result = reducer(undefined, {
      type: DASHBOARD_FETCH_SUCCESS,
      payload: {
        percentage: 9,
        sections: [
          {
            key: "details",
            label: "Personal details",
            subsections: [
              { key: "about-you", label: "About you", complete: false },
              {
                key: "financials",
                label: "Financial circumstances",
                complete: false
              },
              {
                key: "tax-information",
                label: "Tax information",
                complete: false
              },
              {
                key: "identification",
                label: "Identification",
                complete: false
              }
            ]
          },
          {
            key: "investment",
            label: "Investment experience and appetite for risk",
            subsections: [
              {
                key: "investment-experience",
                label: "Investment experience",
                complete: true
              },
              {
                key: "understanding-risk",
                label: "Understanding and assessing investment risk",
                complete: true
              }
            ]
          },
          {
            key: "wealth-planning",
            label: "Wealth planning",
            subsections: [
              {
                key: "wealth-services",
                label: "Our wealth planning services",
                complete: false
              }
            ]
          },
          {
            key: "accounts",
            label: "Bank accounts, advisers and third parties",
            subsections: [
              { key: "bank-accounts", label: "Bank accounts", complete: false },
              {
                key: "advisers",
                label: "Advisers and third parties",
                complete: false
              }
            ]
          },
          {
            key: "portfolios",
            label: "Portfolios",
            subsections: [
              {
                key: "investment-mandate",
                label: "Investment mandate",
                complete: false
              }
            ]
          },
          {
            key: "agreements",
            label: "Agreements and signing",
            subsections: [
              {
                key: "agreements-1",
                label: "Application agreement and signing",
                complete: false
              }
            ]
          }
        ]
      }
    });

    const investmentSection = result.sections.find(s => s.key === "investment");
    expect(investmentSection.complete).toBeTruthy();
    const details = result.sections.find(s => s.key === "details");
    expect(details.complete).toBeFalsy();
  });
});
