import React from 'react';
import PropTypes from 'prop-types';

const time = ['Time', 30, 45, 60, 90];
const ratings = ['Rating', 1, 2, 3, 4, 5];

function RecipeFilters({ mealAreas }) {
  const areaOptions = mealAreas.map((meal) => {
    return <option key={meal.strArea} value={meal.strArea}>{meal.strArea}</option>;
  });
  const timeOptions = time.map((min) => {
    return <option key={min} value={min}>{min !== 'Time' ? `${min} min` : min}</option>;
  });
  const ratingOptions = ratings.map((rating) => {
    return <option key={rating} value={rating}>{rating}</option>;
  });
  return (
    <div>
      <select>
        {areaOptions}
      </select>
      <select>
        {timeOptions}
      </select>
      <select>
        {ratingOptions}
      </select>
    </div>
  );
}
RecipeFilters.propTypes = {
  mealAreas: PropTypes.array.isRequired,
};

export default RecipeFilters;
