import React from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

function NumOfRecipesDisplay({ numOfRecipes, displayRecipeList, showRecipeList }) {
  switch (numOfRecipes) {
    case 0:
      return (
        <div className="num-of-recipes-wrapper">
          <div>Add Ingredients by clicking on the cards</div>
        </div>
      );
    case null:
      return (
        <div className="num-of-recipes-wrapper">
          <div className="num-of-recipes">No recipes avalible</div>
        </div>
      );
    default:
      return (
        <div className="num-of-recipes-wrapper">
          <p className="num-of-recipes">{`${numOfRecipes} recipes avalible`}</p>
          {showRecipeList
            ? <MdKeyboardArrowUp className="arrow-icon" onClick={displayRecipeList} />
            : <MdKeyboardArrowDown className="arrow-icon" onClick={displayRecipeList} /> }
        </div>
      );
  }
}

NumOfRecipesDisplay.propTypes = {
  numOfRecipes: PropTypes.number.isRequired,
  displayRecipeList: PropTypes.func.isRequired,
  showRecipeList: PropTypes.bool.isRequired,
};

export default NumOfRecipesDisplay;
