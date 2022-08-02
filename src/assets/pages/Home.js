import { Link, useNavigate } from "react-router-dom";

//IMPORT STATIC IMAGES :
import hero from "../images/hero.jpg";
import tear from "../images/tear.svg";

const Home = ({ data, userToken }) => {
  const navigate = useNavigate();

  const isUserConnected = () => {
    if (userToken) {
      navigate("/offer/publish");
    } else {
      navigate("/user/login");
    }
  };

  return (
    <div className="app">
      <div className="hero-banner">
        <img className="hero" src={hero} alt="" />
        <img className="tear" src={tear} alt="" />
        <div className="banner-text">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button className="hero-btn" onClick={isUserConnected}>
            Commencez à vendre
          </button>
        </div>
      </div>
      
      <div className="seeAll wrapper">
        <h1>Articles populaires </h1>
        <a href="/home">Tout voir</a>
      </div>

      <main className="data-cards wrapper">
        {data.offers.map((card, index) => {
          return (
            <Link
              key={index}
              className="data-cards-link"
              to={`/product/${card._id}`}
            >
              <div className="card">
                <div className="name"> {card.product_name} </div>
                <div className="image">
                  <img src={card.product_image.secure_url} alt="" />
                </div>
                <div className="description">
                  <div className="price"> {card.product_price} €</div>
                  <div className="size"> {card.product_details[1].TAILLE} </div>
                  <div className="brand">{card.product_details[0].MARQUE}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </main>
    </div>
  );
};

export default Home;
