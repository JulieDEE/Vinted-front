import { useState, useEffect } from "react";
import axios from "axios";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsLetter] = useState(false);


  const fetchData = async () => {
    const response = await axios.post(
      "http:/localhost:4000/user/signup",
      {
      username: { userName },
      email: { email },
      password: { password },
      newsletter: { newsletter },
      }
    
    );
      console.log(response.data);
  };

    fetchData()
    
  return (
    <form
      className="signup-form wrapper"
      method="post"
    //   onSubmit={() => fetchData()}
    >
      <h2>S'inscrire</h2>
      <input
        type="text"
        className="name"
        placeholder="Nom d'utilisateur"
        value={userName}
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
  //   );
};

export default Signup;
