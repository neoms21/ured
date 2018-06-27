import React from "react";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import PortfolioIncomeContainer from "./income-container";
import { reducer as formReducer } from "redux-form";
import { createStore, combineReducers, applyMiddleware } from "redux";
import httpProxy from "../../../utils/httpProxy";
import sinon from "sinon";

describe("portfolio income unit tests", () => {
  // let initialState = getSpecificStateContainer();
  const middleware = [thunk];
  //const mockStore = configureStore(middleWare);

  let container, proxyStub;

  // const dispatchMock = jest.fn();
  beforeEach(() => {
    proxyStub = sinon.stub(httpProxy, "read");
    proxyStub.returns(
      new Promise(function(resolve) {
        resolve({ data: { prop: "abc" } });
      })
    );
    //  container = getSpecificStateContainer();
  });

  afterEach(() => {
    proxyStub.restore();
  });

  it("should not make the initial calls if data is already laoded", () => {
    container = getSpecificStateContainer();
    expect(container).toBeDefined();
    expect(proxyStub.called);
    expect(proxyStub.getCalls().length).toEqual(0);
  });

  it("should load the page and fire the bank accounts requests if not loaded", () => {
    container = getSpecificStateContainer(false, false);

    expect(proxyStub.called);
    expect(proxyStub.getCalls().length).toEqual(2);

    const args = proxyStub.getCalls().map(x => x.args[0]);
    expect(args).toEqual(["investment-income", "bank-accounts-1"]);
  });

  it("should load the reliant and income separate fields and clicking on separate shows radio buttons", () => {
    container = getSpecificStateContainer(undefined, undefined, {
      portfolioIncomeSeparate: {
        label: "Do you require income and capital to be kept separate?",
        type: "boolean",
        readonly: false,
        mandatory: true
      },
      portfolioIncomeRequired: {
        label:
          "Are you reliant on income or regular payments from the Portfolio?",
        type: "boolean",
        readonly: false,
        mandatory: true
      },
      portfolioManageIncome: {
        label: "How would you like to manage the income?",
        type: "text",
        readonly: false,
        mandatory: true,
        key: "portfolioManageIncome"
      },
      portfolioManageIncomeBankAccountId: {
        type: "text",
        readonly: false,
        mandatory: true,
        key: "portfolioManageIncomeBankAccountId"
      },
      portfolioOtherIncomeRequirements: {
        label: "Do you have any other income requirements?",
        type: "boolean",
        readonly: false,
        mandatory: true,
        key: "portfolioOtherIncomeRequirements"
      },
      portfolioOtherIncomeRequirementsDetail: {
        label: "Do you have any other income requirements?",
        type: "boolean",
        readonly: false,
        mandatory: true,
        key: "portfolioOtherIncomeRequirementsDetail"
      },
    });

    const btnSeparate = container.find("#btn-portfolioIncomeSeparate-true");

    btnSeparate.simulate("click");

    const radioButtons = container.find("input[type='radio']");
    expect(radioButtons.length).toEqual(4);

    const radioButton2 = container.find("#portfolioManageIncome-2");
    let ta = container.find("textarea");
    expect(ta.length).toEqual(0);
    radioButton2.simulate("change");
    const bankDropdown = container.find(".Select");
    expect(bankDropdown.length).toEqual(2);

    const btnRquirements = container.find(
      "#btn-portfolioOtherIncomeRequirements-true"
    );

    expect(btnRquirements.length).toEqual(1);

    btnRquirements.simulate('click');
    ta = container.find("textarea");
    expect(ta.length).toEqual(1);
   
  });

  it("should display the regular payments", () => {
    container = getSpecificStateContainer(undefined, undefined, {
      portfolioIncomeSeparate: {
        label: "Do you require income and capital to be kept separate?",
        type: "boolean",
        readonly: false,
        mandatory: true,
        value: true
      },
      portfolioIncomeRequired: {
        label:
          "Are you reliant on income or regular payments from the Portfolio?",
        type: "boolean",
        readonly: false,
        mandatory: true
      },
      portfolioManageIncome: {
        label: "How would you like to manage the income?",
        type: "text",
        readonly: false,
        mandatory: true,
        value: 2,
        key: "portfolioManageIncome"
      },
      portfolioManageIncomeBankAccountId: {
        type: "text",
        readonly: false,
        mandatory: true,
        key: "portfolioManageIncomeBankAccountId"
      }
    });

    const firstRPsource = container.find("#regularPaymentSource1-1");
    expect(firstRPsource.length).toEqual(1);
    expect(firstRPsource.props().checked).toBeTruthy();
    const btnAdd = container.find("#btn-addRegularPayment");

    expect(container.find("#btn-remove").length).toEqual(0);
    expect(btnAdd.length).toEqual(1);
    btnAdd.simulate("click");
  });

  it("should not display add button after max count has reached", () => {
    container = getSpecificStateContainer(
      undefined,
      undefined,
      {
        portfolioIncomeSeparate: {
          label: "Do you require income and capital to be kept separate?",
          type: "boolean",
          readonly: false,
          mandatory: true,
          value: true
        },
        portfolioIncomeRequired: {
          label:
            "Are you reliant on income or regular payments from the Portfolio?",
          type: "boolean",
          readonly: false,
          mandatory: true
        },
        portfolioManageIncome: {
          label: "How would you like to manage the income?",
          type: "text",
          readonly: false,
          mandatory: true,
          value: 2,
          key: "portfolioManageIncome"
        },
        portfolioManageIncomeBankAccountId: {
          type: "text",
          readonly: false,
          mandatory: true,
          key: "portfolioManageIncomeBankAccountId"
        }
      },
      [
        {
          fields: {
            regularPaymentSource1: {
              type: "text",
              readonly: false,
              mandatory: true,
              key: "regularPaymentSource1",
              value: 1
            },
            regularPaymentFrequency1: {
              type: "text",
              readonly: false,
              mandatory: true,
              key: "regularPaymentFrequency1",
              value: "monthly"
            },
            regularPaymentAmount1: {
              type: "currency",
              readonly: false,
              mandatory: true,
              key: "regularPaymentAmount1",
              value: "2,034"
            },
            regularPaymentStartDate1: {
              type: "date",
              readonly: false,
              mandatory: true,
              key: "regularPaymentStartDate1",
              value: "30/06/2018"
            },
            regularPaymentBankAccountId1: {
              label: "Bank account",
              type: "text",
              readonly: false,
              mandatory: true,
              key: "regularPaymentBankAccountId1",
              value: "22"
            }
          }
        },
        {
          fields: {
            regularPaymentSource1: {
              type: "text",
              readonly: false,
              mandatory: true,
              key: "regularPaymentSource1",
              value: 1
            },
            regularPaymentFrequency1: {
              type: "text",
              readonly: false,
              mandatory: true,
              key: "regularPaymentFrequency1",
              value: "monthly"
            },
            regularPaymentAmount1: {
              type: "currency",
              readonly: false,
              mandatory: true,
              key: "regularPaymentAmount1",
              value: "2,034"
            },
            regularPaymentStartDate1: {
              type: "date",
              readonly: false,
              mandatory: true,
              key: "regularPaymentStartDate1",
              value: "30/06/2018"
            },
            regularPaymentBankAccountId1: {
              label: "Bank account",
              type: "text",
              readonly: false,
              mandatory: true,
              key: "regularPaymentBankAccountId1",
              value: "22"
            }
          }
        },
        {
          fields: {
            regularPaymentSource1: {
              type: "text",
              readonly: false,
              mandatory: true,
              key: "regularPaymentSource1",
              value: 1
            },
            regularPaymentFrequency1: {
              type: "text",
              readonly: false,
              mandatory: true,
              key: "regularPaymentFrequency1",
              value: "monthly"
            },
            regularPaymentAmount1: {
              type: "currency",
              readonly: false,
              mandatory: true,
              key: "regularPaymentAmount1",
              value: "2,034"
            },
            regularPaymentStartDate1: {
              type: "date",
              readonly: false,
              mandatory: true,
              key: "regularPaymentStartDate1",
              value: "30/06/2018"
            },
            regularPaymentBankAccountId1: {
              label: "Bank account",
              type: "text",
              readonly: false,
              mandatory: true,
              key: "regularPaymentBankAccountId1",
              value: "22"
            }
          }
        }
      ]
    );

    expect(container.find("#btn-addRegularPayment").length).toEqual(0);
  });

  function getSpecificStateContainer(
    dataLoaded = true,
    accountsLoaded = true,
    fields = {},
    maxRepeats = 3,
    regularPayments = [
      {
        fields: {
          regularPaymentSource1: {
            type: "text",
            readonly: false,
            mandatory: true,
            key: "regularPaymentSource1",
            value: 1
          },
          regularPaymentFrequency1: {
            type: "text",
            readonly: false,
            mandatory: true,
            key: "regularPaymentFrequency1",
            value: "monthly"
          },
          regularPaymentAmount1: {
            type: "currency",
            readonly: false,
            mandatory: true,
            key: "regularPaymentAmount1",
            value: "2,034"
          },
          regularPaymentStartDate1: {
            type: "date",
            readonly: false,
            mandatory: true,
            key: "regularPaymentStartDate1",
            value: "30/06/2018"
          },
          regularPaymentBankAccountId1: {
            label: "Bank account",
            type: "text",
            readonly: false,
            mandatory: true,
            key: "regularPaymentBankAccountId1",
            value: "22"
          }
        }
      }
    ]
  ) {
    const state = {
      portfolioIncome: () => ({
        dataLoaded: dataLoaded,
        accountsLoaded: accountsLoaded,
        fields: fields,
        bankAccounts: [],
        maxRepeats: maxRepeats,
        portfolioRegularPayments: regularPayments
      }),
      tracker: () => ({}),
      refData: () => ({
        incomeManagementOptions: [{ id: 1, value: "a" }, { id: 2, value: "b" }],
        paymentSources: [
          {
            id: 1,
            value: "Payment to come from income"
          },
          {
            id: 2,
            value: "Payment to come from capital"
          }
        ]
      })
    };

    const store = createStore(
      combineReducers(getStore(state)),
      applyMiddleware(...middleware)
    );

    container = mount(
      <Provider store={store}>
        <PortfolioIncomeContainer />
      </Provider>
    );
    return container;
  }
});

function getStore(states, form) {
  return { ...states, form: formReducer };
}
