import React from "react";
import classes from './Header.module.css';
import {  FaMapPin } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";

const Header = () => {
  return (
    <>
    <section>
    <div className={classes.header__container}>

      <div className={classes.logo__container}>
        <a href="#">
          <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon Logo" />
        </a>
      

      <div className={classes.delivery}>
        <span>
          < FaMapPin />
        </span>
        <div>
          <p>Deliver to</p>
          <span>Ethiopia</span>
        </div>
      </div>
      </div>
      
      <div className={classes.search}>
        <select name="" id="">
          <option value="">All</option>
          {/* other options not visible */}
        </select>
        <input type="text" />
        <BsSearch size={25} />
      </div>
  
      <div className={classes.order__container}>
        <a href="#" className={classes.language}>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png" alt="flag of the United States" />
        </a>
        <select name="" id="">
          <option value="">EN</option>
          {/* other options not visible */}
        </select>
        <a href="#">
          <p>Sign In</p>
          <span>Account & Lists</span>
        </a>
        <a href="#">
          <p>Returns</p>
          <span>& Orders</span>
        </a>
        <a href="#" className={classes.cart}>
          <BiCart size={35} />
          <span>0</span>
        </a>
      </div>
      </div>
    </section>
    <LowerHeader/>
    </>
  );
};

export default Header;
