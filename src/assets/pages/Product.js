import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import user from "../images/user.png";

const Product = () => {
  const { productId } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `https://vinted-api-serveur.herokuapp.com/product/${productId}`
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return isLoading ? (
    console.log("is Loading")
  ) : (
    <div className="offerPage">
      <div className="image-offerPage">
        <img src={data.product_image.secure_url} alt="" />
      </div>
      <div className="card-description">
        <div className="top-card">
          <h1> {data.product_price} € </h1>
          <div className="description">
            <div className="elements">
              <p>MARQUE</p>
              <p className="elem">{data.product_details[0].MARQUE} </p>
            </div>
            <div className="elements">
              <p>TAILLE</p>
              <p className="elem">{data.product_details[1].TAILLE} </p>
            </div>
            <div className="elements">
              <p>ETAT</p>
              <p className="elem">{data.product_details[2].ETAT} </p>
            </div>
            <div className="elements">
              <p>COULEUR</p>
              <p className="elem">{data.product_details[3].COULEUR} </p>
            </div>
            <div className="elements">
              <p>EMPLACEMENT</p>
              <p className="elem">{data.product_details[4].EMPLACEMENT} </p>
            </div>
          </div>
        </div>
        <div className="bottom-card">
          <div className="bottom-card-description">
            <h2> {data.product_name} </h2>
            <p> {data.product_description} </p>
            <div className="user-card">
              {data.owner.account.avatar ? (
                <div className="user-img">
                  <img src={data.owner.account.avatar.secure_url} alt="" />
                </div>
              ) : (
                <div className="user-img">
                  <img src={user} alt="default image of user" />
                </div>
              )}

              <p>{data.owner.account.username} </p>
            </div>
          </div>
          <button className="btn-card-pay"> Acheter </button>
        </div>
      </div>
    </div>
  );
};

// function getObjKey(obj, value) {
//   return Object.keys(obj).find(key => obj[key] === value);
// }

export default Product;
