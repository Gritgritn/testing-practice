// Взял с сайта https://regexr.com/3e48o
const emailRegx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const validateEmail = (email: string) => {
  return emailRegx.test(email);
};
