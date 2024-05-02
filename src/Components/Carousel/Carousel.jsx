import React from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel'; // Renamed import to avoid conflict
import { img } from './img/data';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Carousel.module.css'; // Renamed to 'styles'

// Comment Code
function CarouselEffect() {
  return (
    <div>
      <ResponsiveCarousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItemLink, index) => {
          return <img key={index} src={imageItemLink} alt={`carousel-item-${index}`} />
        })}
      </ResponsiveCarousel>
      <div className={styles.hero__img}></div> 
    </div>
  );
}

export default CarouselEffect;
