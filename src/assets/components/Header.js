import logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import * as React from "react";
import PriceRange from "./PriceRange";

const Header = ({
  userToken,
  setUserToken,
  setSignUpForm,
  setConnectForm,
  searchBar,
  setSearchBar,
  sort,
  setSort,
  setFetchRangeValues,
}) => {
  const navigate = useNavigate();


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
            onChange={(e) => {
              setSearchBar(e.target.value);
            }}
          />
        </div>
        <div className="filters">
          <p>Trier par prix : </p>
          <button
            className="trie"
            onClick={() => {
              setSort(!sort);
            }}
          >
            <div className={sort ? "round change" : "round"}></div>
          </button>
          <p>Prix entre : </p>
          <PriceRange setFetchRangeValues={setFetchRangeValues}/>
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
