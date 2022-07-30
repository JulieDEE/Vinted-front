import logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({
  userToken,
  setUserToken,
  setSignUpForm,
  setConnectForm,
  searchBar,
  setSearchBar,
  sort,
  setSort,
  setPriceMax,
  setPriceMin,
  priceMin,
  priceMax,
}) => {
  const navigate = useNavigate();

  console.log(sort);

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
          <button
            className="trie"
            onClick={() => {
              setSort(!sort);
            }}
          >
            <div className={sort ? "round change" : "round"}></div>
          </button>
          <input
            className="price-filter"
            type="text"
            placeholder="Prix Min"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />
          <input
            className="price-filter"
            type="text"
            placeholder="Prix Max"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
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
