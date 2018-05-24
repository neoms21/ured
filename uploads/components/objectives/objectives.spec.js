import React from "react";
import { mount } from "enzyme";
import Objectives from "./objectives";

describe("objectives component unit tests", () => {
  let changeMock, blurMock;
  it("should render the component the number of buttons plus one for items", () => {
    const items = [{ id: "1" }, { id: "2" }];
    const component = getComponent(items);

    expect(component.find("button").length).toEqual(2);
    expect(component.find("textarea").length).toEqual(0);
  });

  it("should show the textarea on button click", () => {
    const items = [{ id: "1" }, { id: "2" }, { id: "other" }];
    const component = getComponent(items);

    const btn = component.find("button#btn-other");
    btn.simulate("click");

    const ta = component.find("textarea");
    expect(ta.length).toEqual(1);
    expect(ta.props().value).toEqual(undefined);
    btn.simulate("click");

    expect(component.find("textarea").length).toEqual(0);
  });

  it("should show the textarea and other button selected if other objective is selected", () => {
    const items = [
      { id: "1" },
      { id: "2" },
      { id: "other", selected: true, value: "aaaa" }
    ];
    const component = getComponent(items);

    expect(component.find("button").length).toEqual(3);
    expect(component.find("button#btn-other").get(0).props.className).toContain(
      "selected"
    );

    const ta = component.find("textarea");

    expect(ta.props().value).toEqual("aaaa");
  });

  it("should toggle the selected of objective clicked", () => {
    const items = [{ id: "1" }, { id: "2" }];
    const component = getComponent(items);

    const btn = component.find("button#btn-1");

    btn.simulate("click");

    expect(component.state().objectives[0].selected).toBeTruthy();
    btn.simulate("click");

    expect(component.state().objectives[0].selected).toBeFalsy();
  });

  it("should fire the form on change with pertinent values", () => {
    const items = [{ id: "1", text: "a", value: "a" }, { id: "2", value: "b" }];

    const component = getComponent(items);

    const btn1 = component.find("button#btn-1");
    const btn2 = component.find("button#btn-2");

    btn1.simulate("click");

    expect(changeMock).toHaveBeenCalledWith("a");
    btn2.simulate("click");

    expect(changeMock).toHaveBeenCalledWith("a,b");
  });

  it("should fire onchange event for textarea change", () => {
    const items = [
      { id: "1", selected: true, value: "aaa" },
      { id: "2" },
      { id: "other", selected: true, value: "abc" }
    ];
    const component = getComponent(items);

    const ta = component.find("textarea");

    ta.simulate("change", { target: { value: "txt" } });

    expect(changeMock).toHaveBeenCalledWith("aaa,txt");
  });

  it("should apply the error class on buttons if no objective is selected", () => {
    const items = [{ id: "1", text: "a", value: "a" }, { id: "2", value: "b" }];

    const component = getComponent(items, true);

    const btn1 = component.find("button#btn-1");
    const btn2 = component.find("button#btn-2");
    expect(btn1.props().className).toContain("input-error");
    expect(btn2.props().className).toContain("input-error");
  });

  it("should apply the error class on textarea if other is selected and submitted", () => {
    const items = [
      { id: "1", text: "a", value: "a" },
      { id: "2", value: "b" },
      { id: "other", text: "Other", value: "", selected: true }
    ];

    const component = getComponent(items, true);
    const divOther = component.find("div#other-obj");
    expect(divOther.props().className).toContain("input-error");
  });

  it("should fire the input on blur event if nothing is filled in", () => {
    const items = [
      { id: "1", text: "a", value: "a" },
      { id: "2", value: "b" },
      { id: "other", text: "Other", value: "", selected: true }
    ];

    const component = getComponent(items, true);
    const ta = component.find("textarea");
    ta.simulate("blur", { target: { value: "" } });

    expect(blurMock).toHaveBeenCalled();
  });

  it("should not fire the input on blur event if nothing is filled in", () => {
    const items = [
      { id: "1", text: "a", value: "a" },
      { id: "2", value: "b" },
      { id: "other", text: "Other", value: "", selected: true }
    ];

    const component = getComponent(items, true);
    const ta = component.find("textarea");
    ta.simulate("blur", { target: { value: "aaa" } });

    expect(blurMock).not.toHaveBeenCalled();
  });

  it("should update the value of other objective in state", () => {
    const items = [
      { id: "1", text: "a", value: "a" },
      { id: "2", value: "b" },
      { id: "other", text: "Other", value: "", selected: true }
    ];

    const component = getComponent(items, true);
    const ta = component.find("textarea");

    ta.simulate("change", { target: { value: "aaaa" } });

    expect(component.state()).toEqual({
      objectives: [
        { id: "1", text: "a", value: "a" },
        { id: "2", value: "b" },
        { id: "other", selected: true, text: "Other", value: "aaaa" }
      ],
      other: true,
      otherValue: "aaaa"
    });
  });

  function getComponent(items, touched) {
    changeMock = jest.fn();
    blurMock = jest.fn();
    const props = {
      meta: { touched },
      items: items,
      input: { onChange: changeMock, onBlur: blurMock }
    };
    return mount(<Objectives {...props} />);
  }
});
