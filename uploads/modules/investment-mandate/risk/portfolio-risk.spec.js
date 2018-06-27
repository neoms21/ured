import React from "react";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import PortfolioRiskContainer from "./portfolio-risk-container";
import { reducer as formReducer } from "redux-form";
import { createStore, combineReducers } from "redux";

describe("portfolio risk tests", () => {
  let initialState = {
    portfolioRisk: () => ({
      dataLoaded: true,
      fields: {
        portfolioRiskReturn: { key: "aa" },
        riskReturn: {}
      },
      riskReturn: 4
    }),
    refData: () => ({
      riskReturn: [
        {
          id: 1,
          return: "Lower",
          risk: "Low",
          value:
            "I want to keep the capital safe and will accept commensurately lower returns available from low risk investments"
        },
        {
          id: 2,
          return: "In line with inflation",
          risk: "LImited",
          value:
            "I am risk averse but will accept a limited degree of risk in order to grow my assets in line with inflation over the medium to long term"
        },
        {
          id: 3,
          return: "Marginally ahead of inflation",
          risk: "Moderate",
          value:
            "I am willing to accept a higher degree of risk in order to grow my assets materially ahead of inflation over the medium to long term"
        },
        {
          id: 4,
          return: "Materially ahead of inflation",
          risk: "High",
          value:
            "I am willing to accept a moderate degree of risk in order to grow my assets marginally ahead of inflation over the medium to long term"
        },
        {
          id: 5,
          return: "Maximum",
          risk: "Very high",
          value:
            "I am seeking to maximise returns and am willing to accept a high degree of risk in order to target this objective"
        }
      ]
    }),
    tracker: () => ({})
  };

  const middleWare = [thunk];
  //const mockStore = configureStore(middleWare);

  let store;
  let container;

  // const dispatchMock = jest.fn();
  beforeEach(() => {
    store = createStore(combineReducers(getStore(initialState)));
    //    store.dispatch = dispatchMock;
    container = mount(
      <Provider store={store}>
        <PortfolioRiskContainer />
      </Provider>
    );
  });

  it("should load the portfolio risk page and fire the set active tracker", () => {
    expect(container).toBeDefined();
    const notification = container.find("div#notification")

    expect(notification.find('span').last().props().children).toContain("high");
  });
  

  it("should load the portfolio risk page with no radio selected", () => {
    const divs = container.find("div.risk-item");
    expect(divs.length).toEqual(5);


    const radioErrors = container.find(".input-error");

    expect(radioErrors.length).toEqual(0);
  });

  it("should add the active class when an risk return value is present", () => {
    const div = container.find("div.risk-item").first();

    div.simulate("click");

    const activeItem = container.find("div.risk-item-active");
    expect(activeItem.length).toEqual(1);
  });

  it("should add the error class to all radios and to form if submit is clicked without selecting anything", () => {
    const form = container.find("form");
    // console.log(form.get(0));
    form.simulate("submit");

    const errorDiv = container.find(".form-error");
    const radioErrors = container.find(".input-error");

    expect(errorDiv.length).toEqual(1);
    expect(radioErrors.length).toEqual(5);
  });
});

function getStore(states, form) {
  return { ...states, form: formReducer };
}
