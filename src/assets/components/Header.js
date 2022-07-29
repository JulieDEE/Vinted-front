import logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ userToken, setUserToken, setSignUpForm, setConnectForm }) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="logo">
        <img src={logo} onClick={() => navigate("/")} alt="logo" />
      </div>
      <div className="searchBar">
        <div className="icon">
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </div>
        <input type="search" placeholder="Rechercher des articles" />
      </div>

      {userToken === null ? (
        <div className="log">
          <button
            className="inscription-btn"
            onClick={() => setSignUpForm(true)}
          >
            S'inscrire
          </button>
          <button className="connect-btn" onClick={() => setConnectForm(true)}>
            Se connecter
          </button>
        </div>
      ) : (
        <div className="log">
          <button
            className="disconnect-btn"
            onClick={() => {
              Cookies.remove("token");
              setUserToken(null);
            }}
          >
            Deconnecter
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
