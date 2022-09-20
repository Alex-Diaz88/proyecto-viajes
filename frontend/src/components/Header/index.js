import "./styles.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>Star Rider</h1>
      </Link>
    </header>
  );
};

export default Header;
