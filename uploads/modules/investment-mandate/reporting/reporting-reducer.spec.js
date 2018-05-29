import reducer from "./reporting-reducer";
import {
  FETCH_REPORTING_SUCCESS,
  TOGGLE_ADDITIONAL_REPORTS
} from "./reporting-action-types";

describe("Reporting reducer tests", () => {
  it("should return default state", () => {
    expect(reducer()).toEqual({
      dataLoaded: false,
      fieldNames: [],
      fields: {}
    });
  });

  it("should set additional reports and transaction advice", () => {
    const result = reducer(
      {},
      {
        type: FETCH_REPORTING_SUCCESS,
        payload: {
          schema: { portfolioReports: {} },
          data: { portfolioReports: "abcd" }
        }
      }
    );

    expect(result).toEqual({
      fieldNames: ["portfolioReports"],
      fields: {
        portfolioReports: { key: "portfolioReports", value: "abcd" }
      },
     
      dataLoaded: true,
      schema: { portfolioReports: {} },
    
      additionalReports: true,
      showTransactionAdvice: false
    });
  });

  it("should set transaction advice as true", () => {
    const result = reducer(
      {},
      {
        type: FETCH_REPORTING_SUCCESS,
        payload: {
          schema: { portfolioReports: {} },
          data: { portfolioReports: "abcd", portfolioServiceType: 2 }
        }
      }
    );

    expect(result).toEqual({
      fieldNames: ["portfolioReports"],
      fields: {
        portfolioReports: { key: "portfolioReports", value: "abcd" }
      },
     
      dataLoaded: true,
      schema: { portfolioReports: {} },
     
      additionalReports: true,
      showTransactionAdvice: true
    });
  });

  it("should toggle additional reports from true to false and clear the field", () => {
    const result = reducer(
      {
        schema: { portfolioReports: {} },
        additionalReports: true,
        fields: { portfolioReports: {} }
      },
      {
        type: TOGGLE_ADDITIONAL_REPORTS,
        payload: false
      }
    );

    expect(result).toEqual({
      schema: { portfolioReports: {} },
      fields: { portfolioReports: {} },
      additionalReports: false
    });
  });

  it("should toggle additional reports from true to false only if payload is false", () => {
    const result = reducer(
      {
        schema: { portfolioReports: {} },
        additionalReports: true,
        fields: { portfolioReports: { value: "abcd" } }
      },
      {
        type: TOGGLE_ADDITIONAL_REPORTS,
        payload: true
      }
    );

    expect(result).toEqual({
      schema: { portfolioReports: {} },
      fields: { portfolioReports: { value: "abcd" } },
      additionalReports: true
    });
  });
});
