import React, { useContext, useState, useEffect } from 'react';
import Layout from '../../Components/Layout/Layout';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import classes from './Cart.module.css';
import { Type } from '../../Utility/action.type';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Cart() {
  const [{ basket }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => item.price * item.amount + amount, 0);
  const [flex, setFlex] = useState(window.innerWidth > 768);

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setFlex(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Oops! No item in your cart</p>
          ) : (
            basket?.map((item) => {
              return (
                <section key={item.id} className={classes.cart__product}>
                  <ProductCard
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={flex}
                  />
                  <div className={classes.btn__container}>
                    <button className={classes.btn} onClick={() => increment(item)}><IoIosArrowUp size={20} /></button>
                    <span> {item.amount} </span>
                    <button className={classes.btn} onClick={() => decrement(item.id)}><IoIosArrowDown size={20}/> </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
