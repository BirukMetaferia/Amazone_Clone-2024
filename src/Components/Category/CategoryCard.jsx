import React from 'react';
import classes from './Category.module.css';

function CategoryCard({ data }) {
  return (
    <div className={classes.category}>

      <a href={data.link}> {/* Assuming there should be a property named link */}
        <span>
          <h2>{data.title}</h2>
        </span>
      </a>
      <img src={data.imgLink} alt={data.name} /> {/* Added data.name as alt text */}
      <p>shop now</p>
    </div>
  );
}

export default CategoryCard;
