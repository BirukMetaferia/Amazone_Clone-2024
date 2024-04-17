import React from "react";
import classes from './Header.module.css';
import { FaMapPin } from 'react-icons/fa'; // Import a pin icon from react-icons
import { BsSearch } from 'react-icons/bs';
import { BiCart } from 'react-icons/bi';

const Header = () => {
  return (
    <header className={classes.headerContainer}>
      <div className={classes.logoContainer}>
        <a href="/">
          <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon Logo" />
        </a>
      </div>

      <div className={classes.deliveryLocation}>
        <FaMapPin />
        <div className={classes.deliveryText}>
          <span>Deliver to</span>
          <span>Ethiopia</span>
        </div>
      </div>

      <div className={classes.searchBar}>
        <select className={classes.searchDropdown} name="categories">
          <option value="all">All</option>
          {/* ... other categories ... */}
        </select>
        <input type="text" placeholder="Search..." />
        <BsSearch />
      </div>

      <div className={classes.accountAndOrders}>
        <a href="/account">
          <div>
            <span>Hello, Sign in</span>
            <span>Account & Lists</span>
          </div>
        </a>
        <a href="/orders">
          <div>
            <span>Returns</span>
            <span>& Orders</span>
          </div>
        </a>
      </div>

      <div className={classes.cartContainer}>
        <a href="/cart">
          <BiCart />
          <span>0</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
