import React from 'react';
import PropTypes from 'prop-types';


function CategoriesList({ name, thumbnail, getRecipesByCat }) {
  return (
    <div className="categories-card" onClick={() => getRecipesByCat(name)}>
      <img src={thumbnail} alt={name} />
      <div className="categories-card-title">
        <p>{name}</p>
      </div>
    </div>
  );
}

CategoriesList.propTypes = {
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default CategoriesList;