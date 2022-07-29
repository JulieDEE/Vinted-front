import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Connect = ({ setUserToken, connectForm, setConnectForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (connectForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [connectForm]);

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
      className={connectForm && "appears"}
      onSubmit={(e) => {
        e.preventDefault();
        handleConnexion();
      }}
    >
      <div className="connect-form"></div>
      <div className="connect-form-container">
        <div
          className="close"
          onClick={() => {
            setConnectForm(!connectForm);
          }}
        >
          X
        </div>
        <div className="connect">
          <h1>Se connecter</h1>
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
        </div>
      </div>
    </form>
  );
};

export default Connect;
