import logo from "../images/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";


const Header = () => {

  const navigate = useNavigate()

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
        <button className="inscription-btn" onClick={() => navigate("/user/signup")} >S'inscrire</button>
        <button className="connect-btn">Se connecter</button>
      </div>
    </header>
  );
};

export default Header;
