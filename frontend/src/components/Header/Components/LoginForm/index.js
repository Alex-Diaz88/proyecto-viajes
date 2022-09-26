import "./styles.css";
import React from "react";

const LoginForm = ({ email, password, setEmail, setPassword, handleLogin }) => {
  return (
    <form
      className="login_form"
      onSubmit={(e) => {
        handleLogin(e);
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
