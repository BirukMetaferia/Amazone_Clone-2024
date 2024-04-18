import React from 'react';
import Layout from '../../Components/Layout/Layout';
import Carousel from '../../Components/Carousel/CarouselEffect';
import Category from '../../Components/Category/CategoryCard';
import Product from '../../Components/Product/Product';
// Comment Code

function Landing() {
  return (
    <Layout>
      <Carousel/>
      <Category/>
      <Product/>
    </Layout>
  );
}

export default Landing;
