import React from 'react';
//import classes from './category.module.css';
import classes from './Category.module.css';

import { Link } from 'react-router-dom';

function CategoryCard({ data }) {
  console.log(data);
  return (
    <div className={classes.category}>
   
      <Link to={`/category/${data.name}`} className={classes.noUnderline}>
        <span>
        <h2 style={{ textDecoration: 'none' }}>{data?.title}</h2>

         

        </span>
        <img src={data?.imgLink} alt="" />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;

