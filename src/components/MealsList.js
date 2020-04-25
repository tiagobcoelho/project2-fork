import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

function MealsList({ name, thumbnail, rating, selectRecipe }) {
  return (
    <div className="category-meal-card" onClick={() => selectRecipe(name, rating)}>
        <img src={thumbnail} alt={name} />
      <div className="category-meal-card-title">
          <Link to="/recipe" title={name}>
            <p>{name}</p>
          </Link>
      </div>
    </div>

  );
}

MealsList.propTypes = {
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default MealsList;
