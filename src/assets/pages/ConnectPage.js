import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Connect = ({ setUserToken, connectForm, setConnectForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // CONNEXION FUNCTION :

  const handleConnexion = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://vinted-api-serveur.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );

      setUserToken(response.data.token);
      Cookies.set("token", response.data.token);

      setConnectForm(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="form-page appears" onSubmit={handleConnexion}>
      <div className="connect-form-page-container">
        <div className="connect-page">
          <div className="message-page">
            <h1>Bienvenue ! </h1>
            <h2>
              Connecte-toi pour pouvoir poster des offres ou effectuer tes
              achats !
            </h2>
          </div>
          <input
            className="item"
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="item"
            type="password"
            placeholder="Mot de passe"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button type="submit" className="connect-btn-2">
            Se connecter
          </button>
          <p>Tu n'as pas de compte Vinted ? Inscris-toi !</p>
        </div>
      </div>
    </form>
  );
};

export default Connect;
