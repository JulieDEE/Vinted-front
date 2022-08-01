import { Link } from "react-router-dom";

const SignupSuccess = () => {
  return (
    <>
      <h1>Vous êtes bien inscris</h1>{" "}
      <Link to={"/login"}> Connectez vous maintenant !</Link>;
    </>
  );
};

export default SignupSuccess;
