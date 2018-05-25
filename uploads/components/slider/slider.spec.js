import React from "react";
import ReactTestRenderer from "react-test-renderer";
import Slider from "./slider";

import { mount } from "enzyme";

describe("Slider tests", () => {
  it("should render the slider component", () => {
    const items = [
      { id: 1, label: "11" },
      { id: 2, label: "11" },
      { id: 3, label: "11" }
    ];
    const component = ReactTestRenderer.create(<Slider items={items} />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should set the state with respect to id of div clicked", () => {
    const changeMock = jest.fn();
    const props = {
      items: [
        { id: 1, label: "11" },
        { id: 2, label: "11" },
        { id: 3, label: "11" }
      ],
      input: { onChange: changeMock }
    };
    const component = mount(<Slider {...props} />);
    const item = component.find("#step-2");

    item.simulate("click", { currentTarget: { offsetLeft: 100 } });

    expect(component.state()).toEqual({
      left: -7,
      position: "absolute",
      selected: true,
      selectedItem: "2"
    });

    expect(changeMock).toHaveBeenCalledWith("2");
  });

  it("should set the state with respect to id of div clicked and not call input on change if not form element", () => {
    const changeMock = jest.fn();
    const props = {
      items: [
        { id: 1, label: "11" },
        { id: 2, label: "11" },
        { id: 3, label: "11" }
      ]
    };
    const component = mount(<Slider {...props} />);
    const item = component.find("#step-2");

    item.simulate("click", { currentTarget: { offsetLeft: 100 } });

    expect(component.state()).toEqual({
      left: -7,
      position: "absolute",
      selected: true,
      selectedItem: "2"
    });

    expect(changeMock).not.toHaveBeenCalled();
  });
});
