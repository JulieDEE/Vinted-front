import { Link } from "react-router-dom";
//import static images :
import hero from "../images/hero.jpg";
import tear from "../images/tear.svg"

const Home = ({ data }) => {


  return (
    <div className="app">
      <div className="hero-banner">
              <img className = "hero" src={hero} alt="" />
              <img className = "tear"src= {tear} alt="" />
        <div className="banner-text">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button className="hero-btn">Commencez à vendre</button>
        </div>
      </div>

      <div className="seeAll wrapper">
              <h1>Articles populaires </h1>
              <a href="/home">Tout voir</a>
      </div>

      <main className="data-cards wrapper">
        {data.map((card, index) => {
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
