import { validate } from "./";
import { LoginPayload } from "types";

describe("validate function", () => {
    it("should return true when both email and password are valid", () => {
      const payload: LoginPayload = { email: "tester@gmail.com", password: "12345678" };
      expect(validate(payload)).toBe(true);
    });

    it("should return false when email is invalid", () => {
      const payload: LoginPayload = { email: "invalid-email", password: "12345678" };
      expect(validate(payload)).toBe(false);
    });

    it("should return false when password is invalid", () => {
      const payload: LoginPayload = { email: "tester@gmail.com", password: "invalid" };
      expect(validate(payload)).toBe(false);
    });

    it("should return false when both email and password are invalid", () => {
      const payload: LoginPayload = { email: "invalid-email", password: "invalid" };
      expect(validate(payload)).toBe(false);
    });
  });
