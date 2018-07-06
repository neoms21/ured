import Dashboard from "./dashboard";
import React from "react";

import { shallow, mount } from "enzyme";

describe("dashboard unit tests", () => {
  const mockFetch = jest.fn();
  const mockSet = jest.fn();
  const mockHide = jest.fn();
  const mockFetchPages = jest.fn();

  let props = {
    groups: [],
    fetchDashboardData: mockFetch,
    setSubHeader: mockSet,
    hideTracker: mockHide,
    fetchPages: mockFetchPages
  };

  it("should make initial calls on load", () => {
    const component = shallow(<Dashboard {...props} />);

    expect(component).toBeDefined();

    expect(mockFetch).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalled();
    expect(mockHide).toHaveBeenCalled();
  });

  it("should have expected number of groups, sections and subsections", () => {
    props.groups = [
      {
        key: "g1",
        sections: [
          {
            key: "s1",
            subsections: [{ key: "ss1", complete: true }, { key: "ss2" }]
          },
          { key: "s2" },
          { key: "s3" }
        ]
      },
      { key: "g2", sections: [] }
    ];
    const component = shallow(<Dashboard {...props} />);

    expect(component.find("Group").length).toEqual(2);
  });

  it("should call fetch pages", () => {
    props.groups = [
      {
        key: "g1",
        sections: [
          {
            key: "s1",
            subsections: [{ key: "ss1", complete: true }, { key: "ss2" }]
          },
          { key: "s2" },
          { key: "s3" }
        ]
      },
      { key: "g2", sections: [] }
    ];

    const component = mount(<Dashboard {...props} />);

    const btn = component.find("#btn-ss1");
    btn.simulate("click");
    expect(mockFetchPages).toHaveBeenCalledWith("ss1");
  });
});
