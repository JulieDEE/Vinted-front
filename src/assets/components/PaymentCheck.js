import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentCheck = ({ name, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);

  const taxBuy = Number((price * 0.08).toFixed(2));
  const fees = Number((price * 0.1).toFixed(2));

  const totalAmmount = Number((price + taxBuy + fees).toFixed(2));

  const handlePayment = async (e) => {
    try {
      e.preventDefault();
      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur",
      });
      const stripeToken = stripeResponse.token.id;
      console.log(typeof totalAmmount);

      const response = await axios.post(
        "https://vinted-api-serveur.herokuapp.com/payment",
        {
          stripeToken,
          name,
          price: totalAmmount,
        }
      );

      if (response.data.status === "succeeded") {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (success) {
    return <h1>Bravo, paiement effectué ! </h1>;
  } else {
    return (
      <form className="payment" onSubmit={handlePayment}>
        <div className="order">
          <h1>Résumé de la commande</h1>
          <div className="top-order">
            <div className="frais">
              <p className="frais-title">{name}</p>
              <p className="frais-price"> {price.toFixed(2)} € </p>
            </div>
            <div className="frais">
              <p className="frais-title">Frais protection acheteurs</p>
              <p className="frais-price"> {taxBuy} € </p>
            </div>
            <div className="frais">
              <p className="frais-title">Frais de port</p>
              <p className="frais-price">{fees} €</p>
            </div>
          </div>
          <div className="bottom-order">
            <div className="total">
              <p className="total-title">Total</p>
              <p className="total-amount"> {totalAmmount} €</p>
            </div>
            <div className="description-order">
              Il ne vous reste plus qu'une étape avant de recevoir votre
              <span> {name}</span>. Vous allez payer
              <span> {totalAmmount} </span> euros, frais inclus.
            </div>
            <div className="payment-container">
              <div className="card-check">
                <CardElement />
              </div>
              <button className="payment-btn" type="submit">
                Confirmer le paiement
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
};

export default PaymentCheck;
