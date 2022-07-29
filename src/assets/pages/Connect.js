import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Connect = ({ setUserToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleConnexion = async () => {
    try {
      const response = await axios.post(
        "https://vinted-api-serveur.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );
      Cookies.set("token", response.data.token);
      setUserToken(response.data.token);

      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <form
      className="connect-form wrapper"
      onSubmit={(e) => {
        e.preventDefault();
        handleConnexion();
      }}
    >
      <h1>Se connecter</h1>
      <input
        type="email"
        placeholder="Adresse email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit" className="connect-btn-2">
        Se connecter
      </button>
    </form>
  );
};

export default Connect;
