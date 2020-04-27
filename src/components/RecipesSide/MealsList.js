import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GiCookingPot } from 'react-icons/gi';
import { MdPeople } from 'react-icons/md';
import { AiFillClockCircle } from 'react-icons/ai';
import StarRatings from 'react-star-ratings';


function MealsList(props) {
  const {
    name,
    thumbnail,
    rating,
    time,
    level,
    people,
    selectRecipe,
  } = props;
  return (
    <div className="category-meal-card" onClick={() => selectRecipe(name, rating, time, level, people)}>
      <img src={thumbnail} alt={name} />
      <div className="category-meal-card-title">
        <Link to="/recipe" title={name}>
          <p>{name}</p>
          <StarRatings
            className="rating"
            rating={rating}
            starRatedColor="yellow"
            starDimension="15px"
            numberOfStars={5}
          />
        </Link>
      </div>
      <div className="extra-info-card-container">
        <div className="extra-info-card">
          <GiCookingPot className="icon" />
          <p>{level}</p>
        </div>
        <div className="extra-info-card">
          <MdPeople className="icon" />
          <p>{people}</p>
        </div>
        <div className="extra-info-card">
          <AiFillClockCircle className="icon" />
          <p>{`${time} min`}</p>
        </div>
      </div>
    </div>

  );
}

MealsList.propTypes = {
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  people: PropTypes.number.isRequired,
  selectRecipe: PropTypes.func.isRequired,
};

export default MealsList;
