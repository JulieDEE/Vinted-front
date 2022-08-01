import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PublishOffer = ({ userToken }) => {
  //variable for every input
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [city, setCity] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);

      const response = await axios.post(
        "https://vinted-api-serveur.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data._id) {
        navigate(`/product/${response.data._id}`);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="offerPublish">
        <h1>Vends ton article</h1>

        <form className="sell wrapper" onSubmit={handleSubmit}>
          <div className="sell-image">
            <div className="sell-image-border">
              <label for="files" class="add-picture">
                Ajoute une photo
              </label>
              <input
                id="files"
                type="file"
                onChange={(e) => {
                  setPicture(e.target.files[0]);
                }}
              ></input>
            </div>
          </div>

          <div className="sell-home">
            <div className="sell-home-title">
              <h3>Titre</h3>
              <input
                className="sell-input"
                type="text"
                placeholder="ex : Chemise Sézane verte"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="sell-home-description">
              <h3>Décris ton article</h3>
              <textarea
                className="sell-input"
                id="sell-textarea"
                type="text"
                placeholder="ex : porté quelquefois, taille correctement"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="sell-description">
            <div className="sell-home-title">
              <h3>Marque</h3>
              <input
                className="sell-input"
                type="text"
                placeholder="ex : Chemise Sézane verte"
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
              />
            </div>
            <div className="sell-home-title">
              <h3>Taille</h3>
              <input
                className="sell-input"
                type="text"
                placeholder="ex : Chemise Sézane verte"
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
            </div>
            <div className="sell-home-title">
              <h3>Couleur</h3>
              <input
                className="sell-input"
                type="text"
                placeholder="ex : Chemise Sézane verte"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />
            </div>
            <div className="sell-home-title">
              <h3>Etat</h3>
              <input
                className="sell-input"
                type="text"
                placeholder="ex : Chemise Sézane verte"
                value={condition}
                onChange={(e) => {
                  setCondition(e.target.value);
                }}
              />
            </div>
            <div className="sell-home-title">
              <h3>Lieu</h3>
              <input
                className="sell-input"
                type="text"
                placeholder="ex : Chemise Sézane verte"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="sell-description">
            <div className="sell-home-title">
              <h3>Prix</h3>
              <input
                className="sell-input"
                type="text"
                placeholder="ex : 0,00 €"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
          </div>

          <button className="add-offer" type="submit">
            Ajouter
          </button>
        </form>
      </div>
    </>
  );
};

export default PublishOffer;
