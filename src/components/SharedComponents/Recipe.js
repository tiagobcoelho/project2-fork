import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';
import { GiCookingPot } from 'react-icons/gi';
import { MdPeople, MdArrowBack } from 'react-icons/md';
import { AiFillClockCircle } from 'react-icons/ai';

function strManipulation(str) {
  return str.replace(/(\r\n|\n|\r)/gm, '').split('. ').map((line, index) => `${index + 1} - ${line}`).join('.\n');
}

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: [],
      path: '',
    };
  }

  componentDidMount() {
    const { location } = this.props;
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
        const newInfo = {
          recipeRating: rating,
          perpTime: time,
          difficulty: level,
          numOfPeople: people,
        };
        const recipeUpdatedData = { ...recipeData, ...newInfo };
        this.setState({
          recipe: recipeUpdatedData,
          path: from,
        });
        console.log(from);
      });
  }

  render() {
    const { recipe, path } = this.state;
    return (
      <div className="recipe-container">
        <div className="recipe-card">
          {path === 'ingredients' ? (
            <Link to="/ingredients">
              <MdArrowBack className="go-back" />
            </Link>
          )
            : (
              <Link to="/recipes">
                <MdArrowBack className="go-back" />
              </Link>
            )}
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <h2>{recipe.strMeal}</h2>
          <StarRatings
            className="rating"
            rating={recipe.recipeRating}
            starRatedColor="yellow"
            starDimension="20px"
            numberOfStars={5}
          />
          <div className="extra-info-container">
            <div className="extra-info">
              <GiCookingPot className="icon" />
              <p>{recipe.difficulty}</p>
            </div>
            <div className="extra-info">
              <MdPeople className="icon" />
              <p>{recipe.numOfPeople}</p>
            </div>
            <div className="extra-info">
              <AiFillClockCircle className="icon" />
              <p>{`${recipe.perpTime} min`}</p>
            </div>
          </div>
          <p className="instuctions">{recipe.strInstructions}</p>
        </div>
      </div>
    );
  }
}

Recipe.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Recipe;
