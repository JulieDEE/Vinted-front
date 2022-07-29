import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

//import icones :
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

//import components :
import Header from "./assets/components/Header";

//import pages :
import Home from "./assets/pages/Home";
import Product from "./assets/pages/Product";
import Signup from "./assets/pages/Signup";
import Connect from "./assets/pages/Connect";

import Cookies from "js-cookie";

library.add(faMagnifyingGlass);

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(Cookies.get("token") || null);
  const [signupForm, setSignUpForm] = useState(false);
  const [connectForm, setConnectForm] = useState(false);
  const [dataFilter, setDataFilters] = useState(null);

  // appel de mon serveur pour récupérer toutes les offres disponibles

  const fetchData = async () => {
    const response = await axios.get(
      "https://vinted-api-serveur.herokuapp.com/"
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  //apel du serveur pour obtenir toutes les offres filtrées :

  const filterOffers = async (filter) => {
    const response = await axios.get(
      `https://vinted-api-serveur.herokuapp.com/offers?${filter}`
    );
    setDataFilters(response.data);
    setIsLoading(false);
    console.log(response.data);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return isLoading ? (
    console.log("is Loading")
  ) : (
    <Router>
      <Signup signupForm={signupForm} setSignUpForm={setSignUpForm} />
      <Connect connectForm={connectForm} setConnectForm={setConnectForm} />
      <Header
        setUserToken={setUserToken}
        userToken={userToken}
        setSignUpForm={setSignUpForm}
        setConnectForm={setConnectForm}
        filterOffers={filterOffers}
      />

      <Routes>
        <Route path="/" element={<Home data={data} userToken={userToken} dataFilter={dataFilter} />} />
        <Route path={`/product/:productId`} element={<Product data={data} />} />
        <Route path={`/user/signup`} element={<Signup />} />
        <Route
          path={`/user/login`}
          element={
            <Connect setUserToken={setUserToken} userToken={userToken} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
