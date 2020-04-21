import React from 'react';
import PropTypes from 'prop-types';

function IngredientsList(props) {
  const { name } = props;
  return (
    <div>
      <div>{name}</div>
      <img src={`https://www.themealdb.com/images/ingredients/${name}-small.png`} alt={name} />
    </div>
  );
}

IngredientsList.propTypes = {
  name: PropTypes.string.isRequired,
};

export default IngredientsList;
