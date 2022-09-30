import "./styles.css";
import { Link } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";
import banner from "../../assets/images/banner.png";
import logo from "../../assets/images/logo.png";
import LoginForm from "../LoginForm";
import LoggedUser from "../LoggedUser";
import SearchTravelsForm from "../SearchTravelsForm";
import useTravels from "../../hooks/useTravels";

const Header = () => {
  const { token } = useTokenContext();
  const { setSearchParams, searchParams } = useTravels();

  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <img className="banner" src={banner} />
        </Link>
        <div className="logo">
          <img src={logo} />
        </div>
        {!token ? <LoginForm /> : <LoggedUser />}
      </div>
      <SearchTravelsForm
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
    </header>
  );
};

export default Header;
