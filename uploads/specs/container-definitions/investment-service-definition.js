import InvestmentServiceContainer from "../../modules/investment-mandate/investment-service/investment-service-container";

export default {
  name: "investment service container",
  component: InvestmentServiceContainer,
  state: {
    investmentServices: {
      dataLoaded: true,
      fields: { a: {}, b: {} },
      lists: {
        portfolioTypes: [],
        currencies: [
          {
            code: "GBP",
            currencyCode: "GBP",
            countryCode: "GBR",
            value: "British Pound",
            id: 1
          },
          {
            code: "USD",
            currencyCode: "USD",
            countryCode: "USA",
            value: "American Dollar",
            id: 2
          },
          {
            code: "EUR",
            currencyCode: "EUR",
            countryCode: "EUR",
            value: "Euro",
            id: 3
          },
          {
            code: "INR",
            currencyCode: "INR",
            countryCode: "IND",
            value: "Indian Rupee",
            id: 4
          }
        ]
      }
    },
    tracker: { showTracker: true }
  },
  propsToCompare: {
    fields: { a: {}, b: {} },
    showTracker: true,
    portfolioTypes: [],
    currencies: [
      {
        id: 1,
        value: "GBP - British Pound",
        code: "GBR",
        currencyCode: "GBP",
        favorite: true
      },
      {
        id: 2,
        value: "USD - American Dollar",
        code: "USA",
        currencyCode: "USD",
        favorite: true
      },
      {
        id: 3,
        value: "EUR - Euro",
        code: "EUR",
        currencyCode: "EUR",
        favorite: true
      },
      {
        id: 4,
        value: "INR - Indian Rupee",
        code: "IND",
        currencyCode: "INR",
        favorite: false
      }
    ]
  },
  functions: [
    {
      name: "setTracker"
    },
    {
      name: "fetchServices",
      params: ["a", "b"]
    }
    // {
    //   name: "saveForm",
    //   params: ["a", "b"]
    // },
  ],
  calledWiths: [
    { payload: "investment-service", type: "SET_ACTIVE_TRACKER_ITEM" }
  ]
};
