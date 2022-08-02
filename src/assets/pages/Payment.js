import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentCheck from "../components/PaymentCheck";
import { useLocation } from "react-router-dom";


const stripePromise = loadStripe(
  "pk_test_51LSIU0EsG1MZIIkBm9YGvS2TmMZCDZ6NGiLuZh42l1WGn2BhPMfTdHxTAsVnnTFFOKQbexx9dcngKwKr1QegwaJO00evgVzrRH"
);



const Payment = () => {

    const location = useLocation();
    const { name } = location.state;
    const { price } = location.state;



  return (
    <Elements stripe={stripePromise}>
          <PaymentCheck name = {name} price = {price}  />
    </Elements>
  );
};

export default Payment;
