import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="register_form">
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();

            if (password !== repeatPassword) {
              console.log("Las contraseñas no coinciden.");
              return;
            }

            const newUser = { username, email, password };

            const res = await fetch(
              `${process.env.REACT_APP_API_URL}/register`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
              }
            );
            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }

            navigate("/");
          } catch (error) {
            console.error(error.message);
          }
        }}
      >
        <label htmlFor="register_username">Nombre de usuario:</label>
        <input
          id="register_username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <label htmlFor="email">Email:</label>
        <input
          id="register_email"
          type="register_email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <label htmlFor="register_password">Contraseña:</label>
        <input
          id="register_password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <label htmlFor="register_repeatPassword">Repite la contraseña:</label>
        <input
          id="register_repeatPassword"
          type="password"
          value={repeatPassword}
          onChange={(event) => {
            setRepeatPassword(event.target.value);
          }}
        />

        <button>Registro</button>
      </form>
    </div>
  );
};

export default RegisterForm;
