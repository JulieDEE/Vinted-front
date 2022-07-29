import logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

const Header = ({
  userToken,
  setUserToken,
  setSignUpForm,
  setConnectForm,
  filterOffers,
}) => {
  const navigate = useNavigate();

  const [searchBar, setSearchBar] = useState("");

  console.log(searchBar);

  const handleSearch = (e) => {
    setSearchBar(e.target.value);
    if (searchBar) {
      filterOffers(`title=${searchBar}`);
    } else {
      filterOffers();
    }
  };

  return (
    <header>
      <div className="logo">
        <img src={logo} onClick={() => navigate("/")} alt="logo" />
      </div>
      <div className="search">
        <div className="searchBar">
          <div className="icon">
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </div>
          <input
            type="search"
            placeholder="Rechercher des articles"
            value={searchBar}
            onChange={handleSearch}
          />
        </div>
        <div className="filters">
          <button
            className="trie"
            onClick={() => {
              filterOffers("sort=descending");
            }}
          >
            Trier par prix
          </button>
          <input className="price-filter" type="text" placeholder="Prix Min" />
          <input className="price-filter" type="text" placeholder="Prix Max" />
        </div>
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
