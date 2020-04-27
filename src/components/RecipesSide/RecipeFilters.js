import React from 'react';
import PropTypes from 'prop-types';


function RecipeFilters({ handleFilterChange }) {
  return (
    <div>
      <select onChange={handleFilterChange}>
        <option key="default" value="default">Sort by</option>
        <option key="rating" value="rating">top rated</option>
        <option key="time" value="time">less time</option>
      </select>
    </div>
  );
}
RecipeFilters.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
};

export default RecipeFilters;
