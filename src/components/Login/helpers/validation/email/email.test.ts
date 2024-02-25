import { validateEmail } from "./";

describe("validateEmail function", () => {
  it("should return true for valid email", () => {
    expect(validateEmail("test@example.com")).toBe(true);
  });

  // Дополните этот файл
});
