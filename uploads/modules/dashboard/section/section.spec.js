import React from "react";

import { shallow, mount } from "enzyme";
import { Section } from ".";
describe("Section unit tests", () => {
  it("should have expected number of section bodies", () => {
    const props = {
      section: {
        complete: true,
        key:"s1",
        subsections: [
          {
            key: "ss1",
          },
          { key: "ss2" },
          { key: "ss3" }
        ]
      }
    };

    const component = mount(<Section {...props} />);

    expect(component.find("AccordionItemBody").length).toEqual(1);
    // expect(component.find("div.checkmark").length).toEqual(1);
  });
});
