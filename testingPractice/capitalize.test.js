const capitalize = require("./capitalize")

test("Should Capitalize london", () => {
    expect(capitalize("london")).toBe("London");
});