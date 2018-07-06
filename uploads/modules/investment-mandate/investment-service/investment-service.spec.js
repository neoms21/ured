import React from "react";
import configureStore from "redux-mock-store";
import { mount } from "enzyme";
import InvestmentServiceContainer from "./investment-service-container";

import { Provider } from "react-redux";
import thunk from "redux-thunk";

describe("investment services tests", () => {
  let initialState = {
    investmentServices: {
      lists: {
        portfolioTypes: [
          { id: 2, value: "val 1" },
          { id: 2, value: "val 2" },
          { id: 3, value: "val 3" }
        ],
        currencies: [],
        portfolioTimeHorizons: []
      },
      dataLoaded: true,
      fields: {
        portfolioServiceType: { label: "aa", key: "aa" },
        portfolioCurrencyType: { key: "a" },
        portfolioObjectives: { key: "x" },
        portfolioTimeHorizon: { key: "b" },
        requiresAlternativeExternalCustodian: { key: "b" },
        otherPortfolioObjective: { key: "c" },
        hasAlternativeExternalCustodian: { key: "c" }
      },
      objectives: [{ id: 1, value: "11" }, { id: 2, value: "11" }]
    },
    refData: { currencies: [] },
    tracker: {},
    form: { "investment-service": { values: { portfolioServiceType: "2" } } }
  };

  const middleWare = [thunk];
  const mockStore = configureStore(middleWare);

  let store;
  let container;
  const props = {
    setTracker: function() {
      console.log("in set tracker");
    },
    fetchRefData: function() {},
    fetchServices: function() {}
  };

  beforeEach(() => {
    store = mockStore(initialState);
    container = mount(
      <Provider store={store}>
        <InvestmentServiceContainer {...props} />
      </Provider>
    );
  });

  it("should load the form component correctly with three radio options", () => {
    expect(container).toBeDefined();
    expect(container.find("input[type='radio']").length).toEqual(3);

    expect(
      store.getActions().find(a => a.type === "SET_ACTIVE_TRACKER_ITEM").payload
    ).toEqual("investment-service");
  });

  it("should load the objective as buttons and clicking on dispatches the action", () => {
    const btnObj1 = container.find("button#btn-1");

    btnObj1.simulate("click");

    expect(
      store.getActions().find(a => a.type === "SET_ACTIVE_TRACKER_ITEM").payload
    ).toEqual("investment-service");
  });

  // it("should show the yes/no custody question and dispatch an action on click", () => {

  //   const btnTrue = container.find("#btn-true");

  //   btnTrue.simulate("click");

  //   expect(
  //     store.getActions().find(a => a.type === TOGGLE_CUSTODIAN_ANSWER).payload
  //   ).toBeTruthy();

  // });

  it("should not render the text area if custody is selected", () => {
    const taOtherObj = container.find(
      "#ta-requiresAlternativeExternalCustodian"
    );
    expect(taOtherObj.length).toEqual(0);
  });

  it("should render the text area if custody is selected", () => {
    initialState.form["investment-service"] = {
      values: {
        hasAlternativeExternalCustodian: true
      }
    };

    store = mockStore(initialState);

    container = mount(
      <Provider store={store}>
        <InvestmentServiceContainer {...props} />
      </Provider>
    );

    const taOtherObj = container.find(
      "#ta-requiresAlternativeExternalCustodian"
    );
    expect(taOtherObj.length).toEqual(1);
  });
});
