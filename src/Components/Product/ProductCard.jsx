import React from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from './Product.module.css';

function ProductCard({ product }) {
  const { image, title, rating, price } = product;

  return (
    <div className={classes.card_container}>
      <a href="">
        <img src={image} alt="" />
      </a>
      <div>
        <h3>{title}</h3>
        <div className={classes.rating}>
          <Rating value={rating.rate} precision={0.1} />
          {/* Display rating count */}
          <small>({rating.count})</small>
        </div>
        <div>
          {/* Display price using CurrencyFormat component */}
          <CurrencyFormat amount={price} />
        </div>
        <button className={classes.button}>Add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;

