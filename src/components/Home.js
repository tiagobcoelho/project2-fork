import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <div className="ingredients-section">
        <h1>Find recepies by ingredient</h1>
        <button type="submit">
          <Link to="/ingredients">Go to Ingredients</Link>
        </button>
      </div>

      <div className="recipes-section">
        <h1>Find recepies by category</h1>
        <button type="submit">
          <Link to="/recipes">Go to recipes</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
