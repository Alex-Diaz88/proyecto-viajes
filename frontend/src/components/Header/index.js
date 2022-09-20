import "./styles.css";
import banner from "../../assets/images/banner.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <img src={banner} />
      </Link>
    </header>
  );
};

export default Header;
