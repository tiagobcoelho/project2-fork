import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';
import { GiCookingPot } from 'react-icons/gi';
import { MdPeople, MdArrowBack } from 'react-icons/md';
import { AiFillClockCircle } from 'react-icons/ai';
import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import './recipe.scss';


function strManipulation(str) {
  return str.replace(/(\r\n|\n|\r)/gm, '').split('. ');
}

function Recipe(props) {
  const [recipe, setRecipe] = useState([]);

  const [bottomTabExpanded, setBottomTabExpanded] = useState(false)

  useEffect(() => {
    const { location } = props;
    const {
      name,
      rating,
      time,
      level,
      people,
      from,
    } = location.state;
    const url = `https://www.themealdb.com/api/json/v2/9973533/search.php?s=${name}`;
    axios
      .get(url)
      .then((response) => response.data.meals[0])
      .then((recipeData) => {
        recipeData.strInstructions = strManipulation(recipeData.strInstructions);
        if(recipeData.strTags !== null){
          recipeData.strTags = `#${recipeData.strTags.split(',').join(' #')}`;
        }
        const newInfo = {
          recipeRating: rating,
          perpTime: time,
          difficulty: level,
          numOfPeople: people,
          path: from,
        };
        const recipeUpdatedData = { ...recipeData, ...newInfo };
        setRecipe(recipeUpdatedData);
      });
  }, []);

  const filteredIngredient = () => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      let strIngredient = "strIngredient" + i;
      let strMeasure = "strMeasure" + i;
      console.log(recipe[strIngredient])
      if (recipe[strIngredient] !== '' && recipe[strIngredient] !== ' ' ) {
        if(recipe[strMeasure] !== '' && recipe[strMeasure] !== ' '){
        ingredients.push(
          `${recipe[strIngredient]} (${recipe[strMeasure]})`
        );
        }else{
          ingredients.push(recipe[strIngredient])
        }
      }
    }
    return ingredients
  };

  const toggleBottomTab = () => {
    setBottomTabExpanded(!bottomTabExpanded)
  }

  return (
    <div className="page-wrapper">
      <div className='recipe-left-container'>
      {recipe.path === 'ingredients' ? (
          <Link to="/ingredients">
            <MdArrowBack className="go-back" /> ingredients
          </Link>
        )
          : (
            <Link to="/recipes">
              <MdArrowBack className="go-back" />
            </Link>
          )}
        <div className="recipe-card">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <div className='recipe-info'>
            <h2>{recipe.strMeal}</h2>
            <StarRatings
              rating={recipe.recipeRating}
              starRatedColor="#f5b131"
              starDimension="20px"
              numberOfStars={5}
            />
            <div className="extra-info-container">
              <div className="extra-info">
                <AiFillClockCircle className="icon" />
                <p>{`${recipe.perpTime} min`}</p>
              </div>
              <div className="extra-info">
                <MdPeople className="icon" />
                <p>{recipe.numOfPeople}</p>
              </div>
              <div className="extra-info">
                <GiCookingPot className="icon" />
                <p>{recipe.difficulty}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='recipe-left-container-bottom'>
          <div className='left'> 
            <h2 className='recipe-info-title'>Category:</h2>
            <p>{recipe.strCategory}</p>
            <h2 className='recipe-info-title'>Cusine</h2>
            <p>{recipe.strArea}</p>
            <h2 className='tags'>{recipe.strTags}</h2>
          </div>
          <div className="right">
            <h2>Ingredients:</h2>
            {filteredIngredient().map((ingredient) => (
              <p className='ingredient'>{ingredient}</p>
            ))}
        </div>
        </div>
      </div>
      <div className={bottomTabExpanded ? 'recipe-container-bottom' : 'recipe-container-right' }>
        <div className='instructions-title-wrapper'>
        <h2 className='tab-title'>Instructions:</h2>
        {bottomTabExpanded ? <IoIosArrowDown className='toggle-icon' onClick={toggleBottomTab} /> : <IoIosArrowUp className='toggle-icon' onClick={toggleBottomTab} />}
        </div>
        <div className={bottomTabExpanded ? 'instructions-wrapper-bottom' : 'instructions-wrapper-right' }>
          <h2 className='instructions-title'>Instructions</h2>
        {recipe.strInstructions !== undefined && recipe.strInstructions.map((instruction, index) => (
          <p className="instructions"><span>{index + 1}.</span> {instruction}</p>
        ))}
        
        <h2 className='video-title'>Video:</h2>
        <a href={recipe.strYoutube} target='_blank'>click to get instructions on video</a>
        </div>
      </div>
      
    </div>
  );
}

Recipe.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Recipe;
