import { mount } from "enzyme";
import SortCodeField from "./sort-code-field";
import React from "react";

describe("sort code field tests", () => {
  let component;

  it("should create three text fields with empty inputs if no input sortcode is specified", () => {
    component = getComponent();
    expect(component.find("input").length).toEqual(3);
  });

  it("should create three text fields with non empty inputs if input sortcode is specified", () => {
    const extraProps = { fieldValue: "343343" };

    const component = getComponent(extraProps);
    expect(component.find("#sc1").props().value).toEqual("34");
    expect(component.find("#sc2").props().value).toEqual("33");
    expect(component.find("#sc3").props().value).toEqual("43");
  });

  it("should handle the on change of any sort code input", () => {
    const changeMock = jest.fn();
    const blurMock = jest.fn();

    const extraProps = {
      fieldValue: "343343",
      input: { onChange: changeMock, onBlur: blurMock }
    };

    const component = getComponent(extraProps);
    const sc1 = component.find("#sc1");
    sc1.simulate("change", { target: { id: "sc1", value: "66" } });
    expect(component.state().sc1.value).toEqual("66");
    expect(changeMock).toHaveBeenCalledWith("663343");
  });

  it("should display the helpText", () => {
    const extraProps = { helpText: "aaa" };
    const component = getComponent(extraProps);

    expect(component.find(".tip").length).toEqual(1);
  });

  it("should show the individual error on sort code box", () => {
    const changeMock = jest.fn();
    const blurMock = jest.fn();

    const extraProps = {
      fieldValue: "",
      input: { onChange: changeMock, onBlur: blurMock }
    };

    const component = getComponent(extraProps);
    const sc1 = component.find("#sc1");
    sc1.simulate("change", { target: { id: "sc1", value: "9o" } });
    expect(component.state().sc1.error).toBeTruthy();
    expect(component.state().sc1.value).toEqual("9o");
    expect(changeMock).toHaveBeenCalledWith({ error: true });
  });

  function getComponent(props) {
    const defaultProps = {
      meta: {}
    };
    const finalProps = props
      ? { ...props, ...defaultProps }
      : { ...defaultProps };
    return mount(<SortCodeField {...finalProps} />);
  }
});
