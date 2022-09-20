import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();

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

            /*
            if (password !== repeatPassword) {
              console.log("Las contraseñas no coinciden.");
            }
            */

            navigate("/");
          } catch (error) {
            console.error(error.message);
          }
        }}
      >
        <label htmlFor="username">Nombre de usuario:</label>
        <input
          id="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <label htmlFor="repeatPassword">Repite la contraseña:</label>
        <input
          id="repeatPassword"
          type="password"
          value={repeatPassword}
          onChange={(event) => {
            setRepeatPassword(event.target.value);
          }}
        />

        <button>Registro</button>
      </form>
    </>
  );
};

export default RegisterForm;
