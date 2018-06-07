import React from "react";
import Reporting from "./reporting";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";

import { Provider } from "react-redux";
import thunk from "redux-thunk";

describe("Reporting specs", () => {
  let store;
  let container;

  let initialState = {
    reporting: {
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
        portfolioReports: { label: "aa" },
        portfolioPaperReporting: {},
        requirePortfolioReports: {}
      },
      objectives: [{ id: 1, value: "11" }, { id: 2, value: "11" }]
    },
    tracker: {},
    form: { reporting: { values: {} } }
  };

  const middleWare = [thunk];
  const mockStore = configureStore(middleWare);

  const props = {
    setTracker: function() {
      console.log("in set tracker");
    },
    fetchReporting: jest.fn(),
    fetchServices: function() {}
  };
  const dispatchMock = jest.fn();
  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = dispatchMock;
    container = mount(
      <Provider store={store} {...props}>
        <Reporting />
      </Provider>
    );
  });

  it("should render the reporting page", () => {
    expect(container).toBeDefined();
  });

  it("should set the state when loading is complete", () => {
    const btnTrue = container.find("#btn-requirePortfolioReports-true");

    btnTrue.simulate("click");

    expect(dispatchMock).toHaveBeenCalledWith({
      payload: { answer: true },
      type: "TOGGLE_ADDITIONAL_REPORTS"
    });
  });

  it("should set the portFolioReports on state", () => {
    initialState.form["reporting"].values.requirePortfolioReports = true;

    store = mockStore(initialState);

    store.dispatch = dispatchMock;
    container = mount(
      <Provider store={store}>
        <Reporting {...props} />
      </Provider>
    );

    const taOtherObj = container.find("#ta-portfolioReports");
    expect(taOtherObj.length).toEqual(1);
  });
});
