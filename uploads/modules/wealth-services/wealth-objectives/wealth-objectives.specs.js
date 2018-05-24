import React from "react";
import ReactTestRenderer from "react-test-renderer";
import WealthObjectives from "./wealth-objectives";
import { mount } from "enzyme";


describe("Wealth Objectives tests", () => {
  let props, store, component;

  beforeEach(() => {
    jest.mock("redux-form", () => {
      return {
        Field: "Field",
        reduxForm: () => component => component
      };
    });

    props = {
      loadComplete: false,
      active: false,
      fields: {},
      setTracker: jest.fn(),
      handleSubmit: jest.fn(),
      fetchObjectives: jest.fn()
    };

    // With redux-form v5, we could do <ContactFormContainer store={store}/>.
    // However, with redux-form v6, the Field component we use is itself
    // connected to the redux store. Therefore, we must put the store into
    // context. To do that, we use <Provider/>.
  });

  it("renders empty welath objectives page", () => {
    const component = ReactTestRenderer.create(<WealthObjectives {...props} />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders renders page when load is complete", () => {
    // const props = {
    // 	loadComplete: true,
    // 	active: true,
    // 	fields: {}
    // };
    props = { ...props, loadComplete: true, objectives: [] };
    const component = ReactTestRenderer.create(<WealthObjectives {...props} />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should change the state of selected objective", () => {
    const objs = [
      { id: "a", text: "11" },
      { id: "b", text: "11" },
      { id: "c", text: "11" }
    ];
    
    const handleSubmit = function() {};
    const props = {
      objectives: objs,
      fields: { requiredWealthService: {} },
      setTracker: jest.fn(),
      loadComplete: true,
      handleSubmit: handleSubmit
    };
    const component = mount(<WealthObjectives {...props} />);

    component.find("button#btn-2").simulate("click");
    expect(component.state().objectives[1].selected).toEqual(true);
    expect(component.state().dirty).toEqual(true);
  });
});
