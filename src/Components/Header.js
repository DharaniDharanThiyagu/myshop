import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const Header = ({ cartItems }) => {
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to='/'><img width="150px" src="images/logo.png" alt="Logo" /></Link>
        </div>
      </div>

      <Search />

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/cart" id="cart" className="ml-3 d-flex align-items-center">
          <span className="cart-text">Cart</span>
          {cartItems.length > 0 && (
            <span className="cart-count ml-2">{cartItems.length}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Header;
