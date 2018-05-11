import React from "react";

import ReactTestRenderer from "react-test-renderer";
import CountryOption from "./country-option";
import { mount } from "enzyme";

describe("Country option  tests", () => {
  it("should render the country option", () => {
    const props = { option: { code: "c", value: "v" } };
    const component = ReactTestRenderer.create(<CountryOption {...props} />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should fire the mouse down event", () => {
    const selectMock = jest.fn();
    const focusMock = jest.fn();
    const props = {
      onSelect: selectMock,
      onFocus: focusMock,
      option: { code: "c", value: "v" }
    };
    const component = mount(<CountryOption {...props} />);

    const container = component.find("div");
    container.simulate("mouseDown", {});
    expect(selectMock).toHaveBeenCalledWith(
      {
        code: "c",
        value: "v"
      },
      expect.objectContaining({
        type: "mousedown"
      })
    );
  });
  it("should fire the mouse enter and mouse move event", () => {
    const selectMock = jest.fn();
    const focusMock = jest.fn();
    const props = {
      onSelect: selectMock,
      onFocus: focusMock,
      option: { code: "c", value: "v" }
    };
    const component = mount(<CountryOption {...props} />);

    const container = component.find("div");
    container.simulate("mouseMove", {});
    expect(focusMock).toHaveBeenCalledWith(
      {
        code: "c",
        value: "v"
      },
      expect.objectContaining({
        type: "mousemove"
      })
    );
    container.simulate("mouseEnter", {});
    expect(focusMock).toHaveBeenCalledWith(
      {
        code: "c",
        value: "v"
      },
      expect.objectContaining({
        type: "mouseenter"
      })
    );
  });
});
