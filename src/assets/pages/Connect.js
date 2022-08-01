import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


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

  if (!connectForm) {
    return null;
  }
  return (
    <form
      className={connectForm ? "appears" : undefined}
      onSubmit={handleConnexion}
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
