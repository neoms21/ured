import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Component, { InvestmentMandate } from "./investment-mandate-container";
import { shallow } from "enzyme";

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
        <Component />
      </Provider>
    );
  });

  it("should render the page", () => {
    expect(component).toBeDefined();
    expect(dispatchMock).toHaveBeenCalledWith({
      payload: {
        showStatus: undefined,
        title: "Investment mandate"
      },
      type: "SET_SUB_HEADER"
    });
  });

  describe("Investment mandate unconnected component unit tests", () => {
    let mockSet = jest.fn();
    let mockHide = jest.fn();
    let props = {
      setSubHeader: mockSet,
      hidePages: mockHide
    };

    afterEach(() => {
      mockSet = jest.fn();
      mockHide = jest.fn();
      props = {
        setSubHeader: mockSet,
        hidePages: mockHide
      };
    });

    const component = getComponent();

    it("should load the component", () => {
      expect(component).toBeDefined();
      expect(mockSet).toHaveBeenCalledWith();
    });

    it("should call hidepages if context is set", () => {
      props.context = { portfolioServiceType: 3 };
      const component = getComponent(props);
      expect(mockHide).toHaveBeenCalledWith();
    });

    it("should not call hidepages if context is set", () => {
      props.context = { portfolioServiceType: 2 };
      const component = getComponent(props);
      expect(mockHide).not.toHaveBeenCalled();
    });

    it("should call hidepages on receving context", () => {
      const component = getComponent();
      //   props.context = { portfolioServiceType: 2 };

      component.setProps({ context: { portfolioServiceType: 2 } });

      expect(mockHide).not.toHaveBeenCalled();
      component.setProps({ context: { portfolioServiceType: 3 } });

      expect(mockHide).toHaveBeenCalled();
    });

    function getComponent(specificProps) {
      const passInProps = specificProps ? { ...specificProps } : { ...props };
      return shallow(<InvestmentMandate {...passInProps} />);
    }
  });
});
