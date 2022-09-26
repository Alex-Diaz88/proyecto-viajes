import "./styles.css";
import { Link } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";
import banner from "../../assets/images/banner.png";
import LoginForm from "../LoginForm";
import LoggedUser from "../LoggedUser";

const Header = () => {
  const { token } = useTokenContext();

  return (
    <header>
      <div className="banner">
        <Link to="/">
          <img src={banner} />
        </Link>
        {!token ? <LoginForm /> : <LoggedUser />}
      </div>
    </header>
  );
};

export default Header;
