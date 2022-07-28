import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

//import icones : 
import { library } from "@fortawesome/fontawesome-svg-core";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

//import components :
import Header from "./assets/components/Header";

//import pages : 
import Home from "./assets/pages/Home"
import Product from "./assets/pages/Product";

library.add(faMagnifyingGlass);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
  }, []);


  return isLoading ? (
    console.log("is Loading")
  ) : (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path={`/product/:productId`} element={<Product data={data} />} />
      </Routes>
    </Router>
  );
}

export default App;
