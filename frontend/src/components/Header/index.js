import "./styles.css";
import banner from "../../assets/images/banner.png";
import LoginForm from "../LoginForm";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="banner">
        <Link to="/">
          <img src={banner} alt="Banner ha fallado" />
        </Link>
        <LoginForm />
      </div>
    </header>
  );
};

export default Header;
