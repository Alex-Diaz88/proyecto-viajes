import "./styles.css";
import { useState, useContext } from "react";
import { useTokenContext } from "../../contexts/TokenContext";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../contexts/AlertContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useTokenContext();
  const { setAlert } = useContext(AlertContext);
  const navigate = useNavigate();

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

          if (!res.ok) {
            throw new Error(body.message);
          }

          setAlert({ type: "success", msg: body.message });
          setToken(body.authToken);
          navigate("/");
        } catch (error) {
          console.error(error.message);
          setAlert({ type: "error", msg: error.message });
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

      <div className="login_buttons">
        <a href="/register">Regístrate</a>
        <button>Ingresar</button>
      </div>
    </form>
  );
};

export default LoginForm;
