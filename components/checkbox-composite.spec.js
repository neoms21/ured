import React from "react";

import ReactTestRenderer from "react-test-renderer";
import CheckboxComposite from "./checkbox-composite";
import { mount } from "enzyme";

describe("Checkbox composite tests", () => {
  it("should render the composite checkbox", () => {
    const component = ReactTestRenderer.create(<CheckboxComposite />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should fire the checkbox change event", () => {
    const props = { onChange: jest.fn() };
    const component = mount(
      <CheckboxComposite {...props}>
        <span>Hello</span>
        <span>World</span>
      </CheckboxComposite>
    );

    const cbx = component.find("input[type='checkbox']");
    cbx.simulate("change", { target: { checked: true } });
    expect(component.state()).toEqual({ checked: true });
    expect(component.find("span").length).toEqual(3);
    
    cbx.simulate("change", { target: { checked: false } });
    expect(component.state()).toEqual({ checked: false });
    expect(component.find("span").length).toEqual(1);
  });
});
