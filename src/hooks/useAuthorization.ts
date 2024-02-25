import { useState } from "react";
import { LoginPayload } from "../types";

type Props = {
  handleSuccess?: (payload: LoginPayload) => void;
  handleError?: VoidFunction;
};

export const useAuthorization = (props: Props) => {
  const { handleSuccess, handleError } = props;

  const [isAuthorized, setIsAuthorized] = useState(false);

  const authorize = (data: LoginPayload) => {
    const { email, password } = data;

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === "tester@gmail.com" && password === "12345678") {
          handleSuccess?.(data);
          setIsAuthorized(true);
          resolve();
        }

        handleError?.();
        reject();
      }, 3000);
    });
  };

  const logout = () => {
    setIsAuthorized(false);
  };

  return {
    isAuthorized,
    authorize,
    logout,
  };
};
