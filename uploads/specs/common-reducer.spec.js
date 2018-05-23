import { definitions } from "./reducer-definitions";

describe("Common reducer tests", () => {
  it("tests the common functionality of reducer", () => {
    const defs = definitions;

    defs.forEach(d => {
      console.log(`Runnings tests for ${d.name}`);
      d.tests.forEach(t => {
        expect(d.reducer(t.input, t.action)).toEqual(t.result);
      });
    });
  });
});
