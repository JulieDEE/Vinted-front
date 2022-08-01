import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ signupForm, setSignUpForm }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsLetter] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (signupForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [signupForm]);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://vinted-api-serveur.herokuapp.com/user/signup",
        {
          username,
          email,
          password,
          newsletter,
        }
      );

      setSignUpForm(!signupForm);
      navigate("/user/signupsuccess");
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <form
      className={signupForm && "appears"}
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        fetchData();
      }}
    >
      <div className="signup-form"></div>
      <div className="form-container">
        <div
          className="close"
          onClick={() => {
            setSignUpForm(!signupForm);
          }}
        >
          X
        </div>
        <h2>S'inscrire</h2>
        <input
          type="text"
          className="item name"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          className="item email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="item password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="checkbox">
          <input
            type="checkbox"
            onChange={(e) => setNewsLetter(e.target.value)}
          />
          <h3>S'inscrire à notre newsletter</h3>
        </div>
        <button type="submit" className="signup-btn">
          S'inscrire
        </button>
        <p className="connect">Tu as déjà un compte ? Connecte-toi !</p>
      </div>
    </form>
  );
};

export default Signup;
