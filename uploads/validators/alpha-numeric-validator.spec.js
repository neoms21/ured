import composer from "./alpha-numeric-validator";

describe("alpha numeric validator tests", () => {
  it("should create a validator function with given length and then validate the value passed", () => {
    expect(composer(4)("4ww3")).toBeUndefined();
    expect(composer(4)("r4ww3")).toBeDefined();
    expect(composer(4,7)("r4ww367")).toBeUndefined();
    expect(composer(4,7)("r4ww35679")).toBeDefined();
    
  });
});
