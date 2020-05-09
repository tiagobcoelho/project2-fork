import React from 'react';
import PropTypes from 'prop-types';

function IngredientsList(props) {
  const {
    name,
    addFilter,
  } = props;
  const searchUrl = name.split(' ').join('%20');
  return (
    <div className="ingredients-card" onClick={() => addFilter(name)} role="button">
      <img src={`https://www.themealdb.com/images/ingredients/${searchUrl}-small.png`} alt={name} />
      <div className="ingredients-card-title">
        <p>{name}</p>
      </div>
    </div>
  );
}

IngredientsList.propTypes = {
  name: PropTypes.string.isRequired,
  addFilter: PropTypes.func.isRequired,
};

export default IngredientsList;
