import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsLetter] = useState(false);

    const navigate = useNavigate()
    
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
        
        const token = response.data.token
        
        console.log(response.data);

        navigate("/user/login")

    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <form
      className="signup-form wrapper"
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        fetchData();
      }}
    >
      <h2>S'inscrire</h2>
      <input
        type="text"
        className="name"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="email"
        className="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="checkbox">
        <input type="checkbox" />
        <h3>S'inscrire à notre newsletter</h3>
      </div>
      <button type="submit" className="signup-btn">
        S'inscrire
      </button>
      <p className="connect">Tu as déjà un compte ? Connecte-toi !</p>
    </form>
  );
};

export default Signup;
