import React from "react";

import { shallow } from "enzyme";
import { Group } from ".";
describe("Group unit tests", () => {
  it("should have expected number of sections", () => {
    const props = {
      group: {
        complete: true,
        sections: [
          {
            key: "s1",
            subsections: [{ key: "ss1", complete: true }, { key: "ss2" }]
          },
          { key: "s2" },
          { key: "s3" }
        ]
      }
    };

    const component = shallow(<Group {...props} />);

    expect(component.find("Section").length).toEqual(3);
    expect(component.find("div.group-checkmark").length).toEqual(1);
  });
});
