import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

//import icones :
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

//import components :
import Header from "./assets/components/Header";
import Connect from "./assets/components/Connect";

//import pages :
import Home from "./assets/pages/Home";
import Product from "./assets/pages/Product";
import Signup from "./assets/pages/Signup";
import ConnectPage from "./assets/pages/ConnectPage";
import SignupSuccess from "./assets/pages/SignupSuccess";
import PublishOffer from "./assets/pages/PublishOffer";

library.add(faMagnifyingGlass);

// DEBUT DE MA FONCTION APP

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(Cookies.get("token") || null);
  const [signupForm, setSignUpForm] = useState(false);
  const [connectForm, setConnectForm] = useState(false);
  const [searchBar, setSearchBar] = useState("");
  const [sort, setSort] = useState(false);
  const [fetchRangeValues, setFetchRangeValues] = useState([0, 100000]);

  // appel de mon serveur pour récupérer toutes les offres disponibles

  useEffect(() => {
    const fetchData = async () => {
      let filters = "";

      if (searchBar) {
        filters += `&title=${searchBar}`;
      }

      if (sort) {
        filters += `&sort=descending`;
      }

      if (!sort) {
        filters += `&sort=ascending`;
      }

      const response = await axios.get(
        `https://vinted-api-serveur.herokuapp.com/offers?minPrice=${fetchRangeValues[0]}&maxPrice=${fetchRangeValues[1]}` +
          filters
      );
      setData(response.data);
      console.log(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [searchBar, fetchRangeValues, sort]);

  return isLoading ? (
    console.log("is Loading")
  ) : (
    <Router>
      <Signup signupForm={signupForm} setSignUpForm={setSignUpForm} />
      <Connect
        connectForm={connectForm}
        setConnectForm={setConnectForm}
        setUserToken={setUserToken}
        userToken={userToken}
      />
      <Header
        setUserToken={setUserToken}
        userToken={userToken}
        setSignUpForm={setSignUpForm}
        setConnectForm={setConnectForm}
        searchBar={searchBar}
        setSearchBar={setSearchBar}
        sort={sort}
        setSort={setSort}
        setFetchRangeValues={setFetchRangeValues}
      />

      <Routes>
        <Route path="/" element={<Home data={data} userToken={userToken} />} />
        <Route path={`/product/:productId`} element={<Product data={data} />} />
        <Route path={`/user/signupsuccess`} element={<SignupSuccess />} />
        <Route
          path={`/user/login`}
          element={
            <ConnectPage
              connectForm={connectForm}
              setConnectForm={setConnectForm}
              setUserToken={setUserToken}
              userToken={userToken}
            />
          }
        />
        <Route
          path={`/offer/publish`}
          element={<PublishOffer userToken={userToken} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
