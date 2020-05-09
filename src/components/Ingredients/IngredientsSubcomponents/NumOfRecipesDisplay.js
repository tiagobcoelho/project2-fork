import React from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';


function NumOfRecipesDisplay(props) {
  const { numOfRecipes, toggleBottomTab, bottomTabExpanded } = props;
  switch (numOfRecipes) {
    case 0:
      return (
        <div className="num-of-recipes-wrapper">
          <div className="num-of-recipes-info">click the cards to add <span>ingredients</span></div>
        </div>
      );
    case null:
      return (
        <div className="num-of-recipes-wrapper">
          <div className="num-of-recipes-info">sorry, no recipes avalible.<br/> <span>try other ingredients</span></div>
        </div>
      );
    default:
      return (
        <div className="num-of-recipes-wrapper">
          <p className="num-of-recipes-info"><span>{numOfRecipes}</span> {numOfRecipes === 1 ? 'recipe': 'recipes'} avalible</p>
          {bottomTabExpanded ? <IoIosArrowDown className='icon' onClick={toggleBottomTab}/> :
           <IoIosArrowUp className='icon' onClick={toggleBottomTab}/>
          }
        </div>
      );
  }
}

NumOfRecipesDisplay.propTypes = {
  numOfRecipes: PropTypes.number.isRequired
};

export default NumOfRecipesDisplay;
