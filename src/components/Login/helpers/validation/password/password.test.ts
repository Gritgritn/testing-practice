import { validatePassword } from "./index";

describe("validateEmail function", () => {
  it("should return true for valid password", () => {
    expect(validatePassword("12345678")).toBe(true);
  });

  it("should return false for not valid with letter password", () => {
    expect(validatePassword("1236ab")).toBe(false);
  });

  it("should return false for not valid with letter with normal length password", () => {
    expect(validatePassword("abcdefgtha")).toBe(false);
  });

  it("should return false for password less than 8 digits", () => {
    expect(validatePassword("1234567")).toBe(false);
  });
});
