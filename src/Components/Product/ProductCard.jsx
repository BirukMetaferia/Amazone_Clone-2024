
import React from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import Rating from '@mui/material/Rating'; // Assuming Rating component exists

import classes from './Product.module.css';
import { maxWidth } from '@mui/system';

function ProductCard({ product, flex, renderDesc }) {
  // Check if product is null
  if (!product) {
    return null; // or a placeholder component/message
  }

  const { image, title, id, rating, price, description } = product;
  
  return (
    <div className={`${classes.card_container} ${flex ? classes.product_flexed : ''}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt="" className={classes.img_container} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{maxWidth:"700px"}}>{description}</div>}
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating.rate} precision={8.1} />
          {/* count */}
          <small>{rating.count}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        <button className={classes.button}>
          add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
