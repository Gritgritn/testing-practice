import React, { useState } from "react";
import { Modal } from "./components/Modal";
import { Login } from "./components/Login";
import { useAuthorization } from "./hooks/useAuthorization";

export const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthorized, authorize, logout } = useAuthorization({
    handleSuccess: () => setIsOpen(false),
  });

  if (isAuthorized) {
    return (
      <div>
        <p>Вы авторизованы</p>
        <button type="button" onClick={logout}>
          Выйти
        </button>
      </div>
    );
  }

  return (
    <>
      <div>
        <button type="button" onClick={() => setIsOpen(true)}>
          Авторизоваться
        </button>
      </div>

      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <Login handleAuthorization={authorize} />
      </Modal>
    </>
  );
};
