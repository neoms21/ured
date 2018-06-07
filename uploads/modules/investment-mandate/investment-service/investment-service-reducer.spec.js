import reducer from "./investment-service-reducer";
import { FETCH_LISTS_SUCCESS } from "./../../../actions/action-types";
import {
  FETCH_SERVICE_SUCCESS,
  TOGGLE_CUSTODIAN_ANSWER
} from "./invesetment-service-action-types";

const initialState = {
  fieldNames: [],
  dataLoaded: false,
  fields: {},
  lists: {
    portfolioTypes: [],
    portfolioTimeHorizons: [],
    currencies: []
  },
  objectives: [
    { id: "1", text: "Income", value: "Income" },
    { id: "2", text: "Growth of capital", value: "Growth of capital" },
    { id: "3", text: "Tax minimisation", value: "Tax minimisation" },
    { id: "4", text: "Retirment", value: "Retirement" },
    { id: "5", text: "Safety", value: "Safety" },
    { id: "6", text: "Speculation", value: "Speculation" },
    { id: "other", text: "Other", value: "" }
  ]
};

describe("investment servive tests", () => {
  it("should return the default state", () => {
    expect(reducer()).toEqual(initialState);
  });

  it("should map the lists if they are returned", () => {
    const result = reducer(initialState, {
      type: FETCH_LISTS_SUCCESS,
      payload: {
        portfolioTypes: [
          {
            value: "Discretionary Investment Management",
            id: 1,
            helpText: "Discretions"
          }
        ],
        currencies: [
          {
            currencyCode: "GBP",
            countryCode: "GBR",
            currencyName: "Great Britain",
            id: 1
          }
        ],
        portfolioTimeHorizons: [
          {
            value: "Less than one year",
            id: 1
          }
        ]
      }
    });

    expect(result.lists.currencies).toEqual([
      {
        currencyCode: "GBP",
        countryCode: "GBR",
        currencyName: "Great Britain",
        id: 1
      }
    ]);
    expect(result.lists.portfolioTypes).toEqual([
      {
        value: "Discretionary Investment Management",
        id: 1,
        helpText: "Discretions"
      }
    ]);
    expect(result.lists.portfolioTimeHorizons).toEqual([
      {
        value: "Less than one year",
        id: 1
      }
    ]);
  });

  it("should ignore the refernce data response if lists are not there", () => {
    const result = reducer(
      {
        lists: {
          currencies: [
            {
              currencyCode: "GBP",
              countryCode: "GBR",
              currencyName: "Great Britain",
              id: 1
            }
          ]
        }
      },
      {
        type: FETCH_LISTS_SUCCESS,
        payload: {
          xyz: [
            {
              value: "Discretionary Investment Management",
              id: 1,
              helpText: "Discretions"
            }
          ]
        }
      }
    );

    expect(result.lists).toEqual({
      currencies: [
        {
          currencyCode: "GBP",
          countryCode: "GBR",
          currencyName: "Great Britain",
          id: 1
        }
      ]
    });
  });

  it("should assign default value to portfolio type", () => {
    const result = reducer(
      { objectives: [] },
      {
        type: FETCH_SERVICE_SUCCESS,

        payload: {
          schema: {
            portfolioServiceType: {
              label: "What type of service is this Portfolio?",
              type: "text",
              readonly: false,
              mandatory: true,
              helpText: "Help needed for each type label."
            },
            portfolioObjectives: {
              label: "What type of service is this Portfolio?",
              type: "text",
              readonly: false,
              mandatory: true,
              helpText: "Help needed for each type label."
            },
            requiresAlternativeExternalCustodian: {
              label: "What type of service is this Portfolio?",
              type: "text",
              readonly: false,
              mandatory: true,
              helpText: "Help needed for each type label."
            }
          },
          data: {}
        }
      }
    );

    expect(result.fields["portfolioServiceType"].value).toEqual("1");
  });

  it("should handle custodian toggle and update from formValues if hasAlternativeExternalCustodian is undefined", () => {
    const state = {
      fields: {
        x: {},
        y: {},
        z: {},
        a: {},
        requiresAlternativeExternalCustodian: {},
        hasAlternativeExternalCustodian: {}
      }
    };

    const result = reducer(state, {
      type: TOGGLE_CUSTODIAN_ANSWER,
      payload: {
        formValues: {
          x: "a11",
          y: "a11",
          z: "a11",
          a: "a11",
          requiresAlternativeExternalCustodian: undefined,
          hasAlternativeExternalCustodian: true
        },
        hasCustodian: true
      }
    });

    expect(result).toEqual({
      fields: {
        x: { value: "a11" },
        y: { value: "a11" },
        z: { value: "a11" },
        a: { value: "a11" },
        requiresAlternativeExternalCustodian: { value: undefined,delete: undefined },
        hasAlternativeExternalCustodian: { value: true }
      }
    });
  });

  it("should handle custodian toggle to false and clear hasAlternativeExternalCustodian  if it is defined ", () => {
    const state = {
      fields: {
        x: {},
        y: {},
        z: {},
        a: {},
        requiresAlternativeExternalCustodian: { value: "abc" },
        hasAlternativeExternalCustodian: { value: false }
      }
    };

    const result = reducer(state, {
      type: TOGGLE_CUSTODIAN_ANSWER,
      payload: {
        formValues: {
          x: "a11",
          y: "a11",
          z: "a11",
          a: "a11",
          requiresAlternativeExternalCustodian: "abcdd",
          hasAlternativeExternalCustodian: false
        },
        hasCustodian:false
      }
    });

    expect(result).toEqual({
      fields: {
        x: { value: "a11" },
        y: { value: "a11" },
        z: { value: "a11" },
        a: { value: "a11" },
        requiresAlternativeExternalCustodian: {
          value: undefined,
          delete: true
        },
        hasAlternativeExternalCustodian: { value: false }
      }
    });
  });
});
