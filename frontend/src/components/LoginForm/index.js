import "./styles.css";
import { useState } from "react";
import { useTokenContext } from "../../contexts/TokenContext";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useTokenContext();

  return (
    <form
      className="login_form"
      onSubmit={async (e) => {
        try {
          e.preventDefault();

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

          setToken(body.authToken);
          toast.success("Sesión iniciada con éxito.");
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }}
    >
      <h3>Iniciar sesión</h3>

      <label htmlFor="login_email">Email:</label>
      <input
        id="login_email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <label htmlFor="login_password">Contraseña:</label>
      <input
        id="login_password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
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
