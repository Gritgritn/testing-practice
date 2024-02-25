import { validateEmail } from "./email";
import { validatePassword } from "./password";
import { LoginPayload } from "types";

export const validate = (payload: LoginPayload) => {
  const { email, password } = payload;

  return validateEmail(email) && validatePassword(password);
};
