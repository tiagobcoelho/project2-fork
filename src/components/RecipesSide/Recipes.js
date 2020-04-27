import React from 'react';
import axios from 'axios';
import { MdArrowBack } from 'react-icons/md';
import CategoriesList from './CategoriesList';
import SearchBar from '../SharedComponents/SearchBar';
import MealsList from './MealsList';
import RecipeFilters from './RecipeFilters';

const rating = [1, 2, 3, 4, 5];
const time = [30, 45, 60, 90];
const level = ['Easy', 'Medium', 'Hard'];
const people = [1, 2, 3, 4];


function randomNum(num) {
  return Math.floor(Math.random() * num);
}

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      categories: [],
      chosenCategory: '',
      allCategoryMeals: [],
      mealsList: [],
      displayCategories: true,
      displayMeals: false,
      insideCategories: false,
    };
  }

  componentDidMount() {
    const url = 'https://www.themealdb.com/api/json/v2/9973533/categories.php';
    axios
      .get(url)
      .then((response) => response.data.categories)
      .then((categoriesData) => {
        this.setState({ categories: categoriesData });
      });
  }

  getRecipesByCat = (name) => {
    const url = `https://www.themealdb.com/api/json/v2/9973533/filter.php?c=${name}`;
    axios
      .get(url)
      .then((response) => response.data.meals)
      .then((recipesListData) => {
        const updatedRecipesList = recipesListData.map((recipe) => {
          const extraInfo = {
            rating: rating[randomNum(5)],
            time: time[randomNum(4)],
            level: level[randomNum(3)],
            people: people[randomNum(4)],
          };
          return { ...recipe, ...extraInfo };
        });
        this.setState({
          chosenCategory: name,
          allCategoryMeals: [...updatedRecipesList],
          mealsList: updatedRecipesList,
          displayCategories: false,
          displayMeals: true,
          insideCategories: true,
        });
      });
  }

  searchInCategory = (event) => {
    const { value } = event.target;
    const { allCategoryMeals } = this.state;
    const filteredMeals = allCategoryMeals.filter((meal) => {
      return meal.strMeal.toLowerCase().includes(value.toLowerCase());
    });
    this.setState({
      searchValue: value,
      mealsList: filteredMeals,
    });
  }

  searchMealByName = (event) => {
    const { value } = event.target;
    const searchValue = value.split(' ').join('_');
    if (value.length > 0) {
      const url = `https://www.themealdb.com/api/json/v2/9973533/search.php?s=${searchValue}`;
      axios
        .get(url)
        .then((response) => response.data.meals)
        .then((recipesListData) => {
          if (recipesListData !== null) {
            const updatedRecipesList = recipesListData.map((recipe) => {
              const extraInfo = {
                rating: rating[randomNum(5)],
                time: time[randomNum(4)],
                level: level[randomNum(3)],
                people: people[randomNum(4)],
              };
              return { ...recipe, ...extraInfo };
            });
            this.setState({
              searchValue: value,
              mealsList: updatedRecipesList,
              displayCategories: false,
              displayMeals: true,
            });
          } else {
            this.setState({
              searchValue: value,
              mealsList: [],
              displayCategories: false,
              displayMeals: true,
            });
          }
        });
    } else {
      this.setState({
        searchValue: value,
        mealsList: [],
        displayCategories: true,
        displayMeals: false,
      });
    }
  }

  goBack = () => {
    this.setState({
      displayCategories: true,
      displayMeals: false,
      insideCategories: false,
    });
  }

  selectRecipe = (name, recipeRating, recipeTime, recipeLevel, recipePeople) => {
    const searchValue = name.split(' ').join('_');
    const { history } = this.props;
    history.push({
      pathname: '/recipe',
      state: {
        name: searchValue,
        rating: recipeRating,
        time: recipeTime,
        level: recipeLevel,
        people: recipePeople,
        from: 'recipes',
      },
    });
  }

  handleFilterChange = (event) => {
    const { value } = event.target;
    const { mealsList, allCategoryMeals } = this.state;
    const originalList = allCategoryMeals;
    switch (value) {
      case 'time': {
        const sortedList = mealsList.sort((mealA, mealB) => {
          return mealA.time - mealB.time;
        });
        this.setState({ mealsList: sortedList });
      }
        break;
      case 'rating': {
        const sortedList = mealsList.sort((mealA, mealB) => {
          return mealB.rating - mealA.rating;
        });
        this.setState({ mealsList: sortedList });
        break;
      }
      default: {
        this.setState({ mealsList: originalList });
      }
    }
  }

  render() {
    const {
      searchValue,
      categories,
      chosenCategory,
      mealsList,
      displayCategories,
      displayMeals,
      insideCategories,
    } = this.state;
    return (
      <div className="recipes-container">
        <h1>Recipes</h1>
        {displayCategories && <h2>Search Recipe By Name</h2>}
        <SearchBar
          searchValue={searchValue}
          handleChange={insideCategories ? this.searchInCategory : this.searchMealByName}
        />
        {displayCategories && <hr />}
        {displayCategories && <h2>Search Recipe By Category</h2>}
        {insideCategories && (
        <div>
          <h2>{chosenCategory}</h2>
          <div className="back-to-categories" onClick={this.goBack}>
            <MdArrowBack />
            <p>categories </p>
          </div>
        </div>
        )}
        {displayCategories && (
        <div className="categories-cards-container">
          {categories.map((category) => (
            <CategoriesList
              key={category.idCategory}
              name={category.strCategory}
              thumbnail={category.strCategoryThumb}
              getRecipesByCat={this.getRecipesByCat}
            />
          ))}
        </div>
        )}
        {insideCategories && <RecipeFilters handleFilterChange={this.handleFilterChange} />}
        {displayMeals && (
          mealsList.length === 0 ? (
            <div>No results</div>
          )
            : (
              <div className="category-meals-cards-container">
                {mealsList.map((meal) => (
                  <MealsList
                    key={meal.idMeal}
                    name={meal.strMeal}
                    thumbnail={meal.strMealThumb}
                    rating={meal.rating}
                    time={meal.time}
                    level={meal.level}
                    people={meal.people}
                    selectRecipe={this.selectRecipe}
                  />
                ))}
              </div>
            )
        )}
      </div>
    );
  }
}


export default Recipes;
