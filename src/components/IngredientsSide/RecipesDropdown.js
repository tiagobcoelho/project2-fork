import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';

function RecipesDropdown({ name, rating, time, level, people, selectRecipe }) {
  let displayName = name;
  if (name.length > 30) {
    displayName = `${name.substring(0, 30)}...`;
  }
  return (
    <div className="recipes-list-item">
      <p onClick={() => selectRecipe(name, rating, time, level, people)}>
        <Link to="/recipe" title={name}>{displayName}</Link>
      </p>
      <StarRatings
        className="rating"
        rating={rating}
        starRatedColor="yellow"
        starDimension="15px"
        numberOfStars={5}
      />
    </div>
  );
}

RecipesDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  selectRecipe: PropTypes.func.isRequired,
};

export default RecipesDropdown;
