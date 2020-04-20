import React from 'react';
import PropTypes from 'prop-types';

function IngredientsList(props) {
  const { name } = props;
  return (
    <div>{name}</div>
  );
}

IngredientsList.propTypes = {
  name: PropTypes.string.isRequired,
};

export default IngredientsList;
