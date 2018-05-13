import validator from "./mixed-validator";

describe("mixed validator unit tests", () => {
  it("should return undefined if value exists", () => {
    const result = validator("aaa", {}, {});

    expect(result).toBeUndefined();
  });

  it("should return the error message if related fields are not filled", () => {
    const fieldValues = { a: "aaa", c: "ccc" };
    const props = { relatedFields: ["b", "d"] };

    const result = validator(undefined, fieldValues, props);

    expect(result).toBeDefined();
  });

  it("should return undefined if related fields are defined", () => {
    const fieldValues = { a: "aaa", b: "bb", c: "ccc" };
    const props = { relatedFields: ["b", "d"] };

    const result = validator(undefined, fieldValues, props);

    expect(result).toBeUndefined();
  });
});
