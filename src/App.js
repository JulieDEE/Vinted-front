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

// DEBUT DE MA FONCTION APP

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(Cookies.get("token") || null);
  const [signupForm, setSignUpForm] = useState(false);
  const [connectForm, setConnectForm] = useState(false);
  const [searchBar, setSearchBar] = useState("");
  const [sort, setSort] = useState(false);
  const [priceMin, setPriceMin] = useState(null);
  const [priceMax, setPriceMax] = useState(null);

  // appel de mon serveur pour récupérer toutes les offres disponibles

  useEffect(() => {
    const fetchData = async () => {
      let filters = "";

      if (searchBar) {
        if (filters) {
          filters += `&title=${searchBar}`;
        } else {
          filters += `title=${searchBar}`;
        }
      }

      if (priceMin) {
        if (filters) {
          filters += `&minPrice=${priceMin}`;
        } else {
          filters += `minPrice=${priceMin}`;
        }
      }

      if (priceMax) {
        if (filters) {
          filters += `&maxPrice=${priceMax}`;
        } else {
          filters += `maxPrice=${priceMax}`;
        }
      }

      if (sort) {
        if (filters) {
          filters += `&sort=descending`;
        } else {
          filters += `sort=descending`;
        }
      }

      if (!sort) {
        if (filters) {
          filters += `&sort=ascending`;
        } else {
          filters += `sort=ascending`;
        }
      }

      const response = await axios.get(
        "https://vinted-api-serveur.herokuapp.com/offers?" + filters
      );
      setData(response.data);
      setIsLoading(false);
      console.log(filters);
    };
    fetchData();
  }, [searchBar, priceMin, priceMax, sort]);

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
        searchBar={searchBar}
        setSearchBar={setSearchBar}
        sort={sort}
        setSort={setSort}
        setPriceMax={setPriceMax}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        priceMin={priceMin}
      />

      <Routes>
        <Route path="/" element={<Home data={data} userToken={userToken} />} />
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
