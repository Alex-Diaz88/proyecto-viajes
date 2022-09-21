import "./styles.css";
import { useState } from "react";
import { useTokenContext } from "../../contexts/TokenContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setToken } = useTokenContext();

  return (
    <form
      className="login_form"
      onSubmit={async (event) => {
        try {
          event.preventDefault();

          const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const body = await res.json();

          setToken(body.authToken);

          if (!res.ok) {
            throw new Error(body.message);
          }
        } catch (error) {
          console.error(error.message);
        }
      }}
    >
      <h3>Iniciar sesión</h3>

      <label htmlFor="login_email">Email:</label>
      <input
        id="login_email"
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <label htmlFor="login_password">Contraseña:</label>
      <input
        id="login_password"
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <a href="/register">Regístrate</a>

      <div className="login_button">
        <button>Ingresar</button>
      </div>
    </form>
  );
};

export default LoginForm;
