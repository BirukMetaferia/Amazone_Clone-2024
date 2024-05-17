// Results.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../Components/Loader/Loader';
import classes from './Results.module.css';

import Layout from '../../Components/Layout/Layout';
import { useParams } from 'react-router-dom';
import ProductCard from '../../Components/Product/ProductCard';
import { productUrl } from '../../Api/endpoints';

function Results() {
  const { categoryName } = useParams(); // Get categoryName from URL
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${productUrl}/products/category/${categoryName}`) // Use categoryName in the URL
      .then((res) => {
        if (Array.isArray(res.data)) {
          setResults(res.data);
        } else {
          console.error('Response data is not an array:', res.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [categoryName]); // Include categoryName in the dependency array

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Layout>
          <section>
            <h1 style={{ padding: '30px' }}>Results</h1>
            <p style={{ padding: '30px' }}>Category / {categoryName}</p>
            <hr />
            <div className={classes.products_container}>
              {results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  renderAdd={true}
               
                />
              ))}
            </div>
          </section>
        </Layout>
      )}
    </>
  );
}

export default Results;
