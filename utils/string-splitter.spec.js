import splitter from "./string-splitter";

describe("string splitter tests", () => {
  it("should split strings into three equal parts", () => {
    expect(splitter("424321", 2)).toEqual(["42", "43", "21"]);
  });
});
