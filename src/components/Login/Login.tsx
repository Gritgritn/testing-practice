import React, { useState } from "react";
import type { LoginPayload } from "types";
import { validate as validateLoginForm } from "./helpers/validation";
import styles from "./Login.module.css";

type Props = {
  handleAuthorization: (payload: LoginPayload) => Promise<void>;
};

export const Login = (props: Props) => {
  const { handleAuthorization } = props;

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const payload: LoginPayload = { email, password };

    const isValid = validateLoginForm(payload);

    if (!isValid) {
      setError("Валидация не пройдена");
      return;
    }

    setError("");
    setIsLoading(true);
    handleAuthorization(payload)
      .catch(() => setError("Введен неверный email или пароль"))
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <p>Почта для входа tester@gmail.com</p>
      <p>Пароль для входа 12345678</p>

      {error && <p className={styles.error}>{error}</p>}

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <button type="button" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Загрузка" : "Войти"}
        </button>
      </div>
    </div>
  );
};
