import "./styles.css";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";
import { AlertContext } from "../../contexts/AlertContext";
import banner from "../../assets/images/banner.png";
import LoginForm from "./Components/LoginForm";
import UserProfileHeader from "./Components/UserProfileHeader";

const Header = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = useTokenContext();
  const { loggedUser } = useTokenContext();
  const { setAlert } = useContext(AlertContext);

  const handleLogin = async (e) => {
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

    setAlert({ type: "success", msg: body.message });
    setToken(body.authToken);
    Navigate("/");

    try {
    } catch (error) {
      console.log(error);
      setAlert({ type: "error", msg: error.message });
    }
  };

  return (
    <header>
      <div className="banner">
        <Link to="/">
          <img src={banner} />
        </Link>
        {!token ? (
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        ) : (
          <UserProfileHeader loggedUser={loggedUser} />
        )}
      </div>
    </header>
  );
};

export default Header;
