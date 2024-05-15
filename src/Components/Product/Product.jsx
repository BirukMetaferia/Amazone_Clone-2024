// Product.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader'; // Corrected path to Loader component
import ProductCard from './ProductCard'; // Corrected path to ProductCard component
import classes from './Product.module.css'; // Make sure this path is correct

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products.map((singleProduct) => (
            <ProductCard key={singleProduct.id} product={singleProduct} />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
