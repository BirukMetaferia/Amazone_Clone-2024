import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Components/Layout/Layout'; // Update the path to your Layout component
import ProductCard from '../../Components/Product/ProductCard'; // Update the path to your ProductCard component
import Loader from '../../Components/Loader/Loader'; // Update the path to your Loader component

function ProductDetails() {
  const { productId } = useParams(); // Use "productId" to match the route parameter
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Product not found or error fetching data');
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <ProductCard product={product} 
          flex={true}
          renderDesc={true}
          renderAdd={true}
          />
        </div>
      )}
    </Layout>
  );
}

export default ProductDetails;
