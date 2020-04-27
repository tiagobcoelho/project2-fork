import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-logo"><Link to="/">Logo</Link></div>
      <ul className="navbar-items">
        <li className="navbar-link"><Link to="/ingredients">Ingredients</Link></li>
        <li className="navbar-link"><Link to="/recipes">Recipes</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;
