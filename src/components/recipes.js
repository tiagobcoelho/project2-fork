import React from 'react';
import axios from 'axios';
import { MdArrowBack } from 'react-icons/md';
import CategoriesList from './CategoriesList';
import SearchBar from './SearchBar';
import MealsList from './MealsList';

const rating = [1, 2, 3, 4, 5];

function randomNum(num) {
  return Math.floor(Math.random() * num);
}

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      categories: [],
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
          const recipeRating = { rating: rating[randomNum(5)] };
          return { ...recipe, ...recipeRating };
        });
        this.setState({
          allCategoryMeals: updatedRecipesList,
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
          const updatedRecipesList = recipesListData.map((recipe) => {
            const recipeRating = { rating: rating[randomNum(5)] };
            return { ...recipe, ...recipeRating };
          });
          this.setState({
            searchValue: value,
            mealsList: updatedRecipesList,
            displayCategories: false,
            displayMeals: true,
          });
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

  selectRecipe = (name, recipeRating) => {
    const searchValue = name.split(' ').join('_');
    const { history } = this.props;
    history.push({
      pathname: '/recipe',
      state: {
        name: searchValue,
        rating: recipeRating,
        from: 'recipes',
      },
    });
  }

  render() {
    const {
      searchValue,
      categories,
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
          <MdArrowBack onClick={this.goBack} />
          <p>categories</p>
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
        {displayMeals && (
          mealsList === null || mealsList.length === 0 ? (
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
