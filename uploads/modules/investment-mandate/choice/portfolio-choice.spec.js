import React from "react";
import PortfolioChoice from "./portfolio-choice-container";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { TOGGLE_RESTRICTION } from "./portfolio-choice-action-types";

describe("Reporting specs", () => {
  let store;
  let container;

  let initialState = {
    choice: {
      dataLoaded: true,
      fields: {
        portfolioRiskTolerance: { key: "portfolioRiskTolerance" },
        portfolioMatchesRequirements: { key: "portfolioMatchesRequirements" },
        applyPortfolioRestrictions: { key: "applyPortfolioRestrictions" },
        portfolioRestrictions: { key: "portfolioRestrictions" }
      }
    },
    refData: {
      riskLevel: [
        { id: 1, value: "val 1" },
        { id: 2, value: "val 2" },
        { id: 3, value: "val 3" }
      ]
    },
    tracker: {},
    form: { "portfolio-choice": { values: {} } }
  };

  const middleWare = [thunk];
  const mockStore = configureStore(middleWare);

  const props = {
    setTracker: function() {
      console.log("in set tracker");
    }
  };
  const dispatchMock = jest.fn();
  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = dispatchMock;
    container = mount(
      <Provider store={store} {...props}>
        <PortfolioChoice />
      </Provider>
    );
  });

  it("should render the choice page", () => {
    expect(container).toBeDefined();
  });

  it("should trigger the toggle restriction method", () => {
    const btnTrue = container.find("#btn-applyPortfolioRestrictions-true");

    btnTrue.simulate("click");

    expect(dispatchMock).toHaveBeenCalledWith({
      payload: {answer:true, currentValues:{}},
      type: TOGGLE_RESTRICTION
    });
  });

  it("should show textarea for restrictions", () => {
    initialState.form[
      "portfolio-choice"
    ].values.applyPortfolioRestrictions = true;
    store = mockStore(initialState);
    store.dispatch = dispatchMock;
    container = mount(
      <Provider store={store}>
        <PortfolioChoice {...props} />
      </Provider>
    );

    expect(container.find("textarea").length).toEqual(1);
  });

  it("should show notification icon", () => {
    initialState.form[
      "portfolio-choice"
    ].values.portfolioMatchesRequirements = true;
    store = mockStore(initialState);
    store.dispatch = dispatchMock;
    container = mount(
      <Provider store={store}>
        <PortfolioChoice {...props} />
      </Provider>
    );
    expect(container.find("img").length).toEqual(1);
  });

  //   it("should set the portFolioReports on state", () => {
  //     initialState.reporting.additionalReports = true;

  //     store = mockStore(initialState);

  //     store.dispatch = dispatchMock;
  //     container = mount(
  //       <Provider store={store}>
  //         <PortfolioChoice {...props} />
  //       </Provider>
  //     );
  //     const btnTrue = container.find("#btn-true");

  //     btnTrue.simulate("click");

  //     const taOtherObj = container.find("#ta-portfolioReports");
  //     expect(taOtherObj.length).toEqual(1);
  //   });
});
