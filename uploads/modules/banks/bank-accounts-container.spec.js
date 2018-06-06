import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import BankAccountsContainer from "./bank-accounts-container";

describe("Bank accounts page tests", () => {
  let store;
  let component;

  let initialState = {
    accounts: {
      dataLoaded: true,
      bankAccounts: [],
      fields: {},
      displayFields: []
    },

    refData: {
      currencies: [
        {
          code: "INR",
          countryCode: "IND",
          value: "Indian Rupee",
          id: 4
        },
        {
          code: "GBP",
          countryCode: "GBR",
          value: "British Pound",
          id: 1
        },
        {
          code: "USD",
          countryCode: "USA",
          value: "American Dollar",
          id: 2
        },
        {
          code: "EUR",
          countryCode: "EUR",
          value: "Euro",
          id: 3
        }
      ]
    },
    tracker: {},
    form: { accounts: { values: {} } }
  };

  const middleWare = [thunk];
  const mockStore = configureStore(middleWare);

  const dispatchMock = jest.fn();
  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = dispatchMock;
    component = mount(
      <Provider store={store}>
        <BankAccountsContainer />
      </Provider>
    );
  });

  it("should render the page", () => {
    expect(component).toBeDefined();
    expect(dispatchMock).toHaveBeenCalledWith({
      payload: {
        showStatus: undefined,
        title: "Bank accounts, advisers and third parties"
      },
      type: "SET_SUB_HEADER"
    });
  });

  it("should preselect the country and currency fields", () => {
    initialState.accounts.bankAccounts = [
      {
        fields: {
          isUKBankAccount1: { value: true },
          bankAccountCurrency1: { value: 1 },
          bankAccountBuildingSocietyReference1: {},
          bankAccountProvider1: {},
          bankAccountSortCode1: {},
          bankBicCode1: {},
          bankAbaFedwire1: {},
          bankAccountNumber1: {},
          bankAccountCurrency: {},
          bankAccountIBAN: {}
        },
        displayFields: []
      }
    ];
    initialState.accounts.displayFields = [];
    store = mockStore(initialState);
    store.dispatch = dispatchMock;
    component = mount(
      <Provider store={store}>
        <BankAccountsContainer />
      </Provider>
    );

    const trueButton = component.find("div#btn-isUKBankAccount1-true");
    expect(trueButton.length).toEqual(1);
    expect(component.find("div#btn-isUKBankAccount1-false").length).toEqual(1);

    expect(trueButton.props().className).toContain("list-item-active");
    expect(
      component.find("div#btn-isUKBankAccount1-false").props().className
    ).not.toContain("list-item-active");

    expect(
      component
        .find("Select")
        .find("span")
        .find("span.name")
        .props().children
    ).toEqual("GBP - British Pound");
  });

  it("should fire the select displayfields action", () => {
    initialState.accounts.bankAccounts = [
      {
        fields: {
          isUKBankAccount1: { value: true },
          bankAccountCurrency1: { value: 1 },
          bankAccountBuildingSocietyReference1: {},
          bankAccountProvider1: {},
          bankAccountSortCode1: {},
          bankBicCode1: {},
          bankAbaFedwire1: {},
          bankAccountNumber1: {},
          bankAccountCurrency: {},
          bankAccountIBAN: {}
        },
        displayFields: []
      }
    ];
    initialState.accounts.displayFields = [];
    initialState.form["accounts"].values.bankAccountCurrency1 = 1;
    store = mockStore(initialState);
    store.dispatch = dispatchMock;
    component = mount(
      <Provider store={store}>
        <BankAccountsContainer />
      </Provider>
    );

    const falseButton = component.find("div#btn-isUKBankAccount1-false");

    falseButton.simulate("click");

    expect(dispatchMock).toHaveBeenCalledWith({
      payload: {
        currencies: [
          {
            code: "GBR",
            currencyCode: "GBP",
            favorite: true,
            id: 1,
            value: "GBP - British Pound"
          },
          {
            code: "USA",
            currencyCode: "USD",
            favorite: true,
            id: 2,
            value: "USD - American Dollar"
          },
          {
            code: "EUR",
            currencyCode: "EUR",
            favorite: true,
            id: 3,
            value: "EUR - Euro"
          },
          {
            code: "IND",
            currencyCode: "INR",
            favorite: false,
            id: 4,
            value: "INR - Indian Rupee"
          }
        ],
        currencyId: 1,
        index: 1,
        isUkBankAccount: false
      },
      type: "SELECT_DISPLAY_FIELDS"
    });
  });

  it("should fire the select displayfields action on currency Change", () => {
    initialState.accounts.bankAccounts = [
      {
        fields: {
          isUKBankAccount1: { value: true },
          bankAccountCurrency1: { value: 1 },
          bankAccountBuildingSocietyReference1: {},
          bankAccountProvider1: {},
          bankAccountSortCode1: {},
          bankBicCode1: {},
          bankAbaFedwire1: {},
          bankAccountNumber1: {},
          bankAccountCurrency: {},
          bankAccountIBAN: {}
        },
        displayFields: []
      }
    ];
    initialState.accounts.displayFields = [];
    initialState.form["accounts"].values.bankAccountCurrency1 = 1;
    store = mockStore(initialState);
    store.dispatch = dispatchMock;
    component = mount(
      <Provider store={store}>
        <BankAccountsContainer />
      </Provider>
    );

    const currencyControl = component.find("div.Select-control");

    currencyControl.simulate("click");

    expect(dispatchMock).toHaveBeenCalledWith({
      payload: {
        currencies: [
          {
            code: "GBR",
            currencyCode: "GBP",
            favorite: true,
            id: 1,
            value: "GBP - British Pound"
          },
          {
            code: "USA",
            currencyCode: "USD",
            favorite: true,
            id: 2,
            value: "USD - American Dollar"
          },
          {
            code: "EUR",
            currencyCode: "EUR",
            favorite: true,
            id: 3,
            value: "EUR - Euro"
          },
          {
            code: "IND",
            currencyCode: "INR",
            favorite: false,
            id: 4,
            value: "INR - Indian Rupee"
          }
        ],
        currencyId: 1,
        index: 1,
        isUkBankAccount: false
      },
      type: "SELECT_DISPLAY_FIELDS"
    });
  });
});
