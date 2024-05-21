import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format'; // Import CurrencyFormat

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket.reduce((amount, item) => item.price * item.amount + amount, 0);

  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    console.log(e);
    setCardError(e.error ? e.error.message : "");
  };

  return (
    <Layout>
      {/* header */}
      <div className={classes.payment_header}>
        Checkout {totalItem} items
      </div>
      {/* payment method */}
      {/* address */}
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
        {/* product */}
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
              <form action="">
                {cardError && <small style={{color:"red"}}>{cardError}</small>}
                <CardElement onChange={handleChange} />
                <div className={classes.payment__price}>
  <div><span style={{ display:"flex",gap:"10px"}}><p>Total Order </p><CurrencyFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} /></span></div>
  <button>Pay now</button>
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
