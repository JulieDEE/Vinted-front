import logo from "../images/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="searchBar">
        <div className="icon">
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </div>
        <input type="search" placeholder="Rechercher des articles" />
      </div>
      <div className="log">
        <button className="inscription-btn">S'inscrire</button>
        <button className="connect-btn">Se connecter</button>
        <button className="sell-btn">Vends maintenant</button>
      </div>
    </header>
  );
};

export default Header;
