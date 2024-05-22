import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format';
import { axiosInstance } from "../../Api/axios";
import ClipLoader from "react-spinners/ClipLoader";
import { db, collection, doc, setDoc } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from '../../Utility/action.type';


function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket.reduce((amount, item) => item.price * item.amount + amount, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCardError(e.error ? e.error.message : "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      // 1. Backend: Contact the backend to get the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      const clientSecret = response.data?.clientSecret;

      // 2. Client Side: Confirm the card payment
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // 3. Save order to Firestore database
      const ordersRef = collection(db, "users", user.uid, "orders");
      const orderDoc = doc(ordersRef, paymentIntent.id);
      await setDoc(orderDoc, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order" } });
      // Clear basket or navigate to a success page
    } catch (error) {
      console.error("Error during payment:", error);
      setProcessing(false);
    }
  };

  return (
    <Layout>
      <div className={classes.payment_header}>
        Checkout {totalItem} items
      </div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          {user ? (
            <div>
              <div>{user.email}</div>
              <div>123 React Lane</div>
              <div>Chicago, IL</div>
            </div>
          ) : (
            <div>Loading user data...</div>
          )}
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {cardError && <small style={{ color: "red" }}>{cardError}</small>}
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                      },
                    },
                    autofill: {
                      enabled: true,
                      disablePostalCode: true,
                    },
                  }}
                  onChange={handleChange}
                />
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order </p>
                      <CurrencyFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait...</p>
                      </div>
                    ) : "Pay Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
