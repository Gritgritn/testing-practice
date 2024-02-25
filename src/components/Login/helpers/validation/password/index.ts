const numbersRegex = /^[0-9]*$/;
const minLength = 8;

export const validatePassword = (password: string) => {
  return password.length >= minLength && numbersRegex.test(password);
};
