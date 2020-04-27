import React from 'react';
import axios from 'axios';
import IngredientsList from './IngredientsList';
import Filters from './Filters';
import SearchBar from '../SharedComponents/SearchBar';
import RecipesDropdown from './RecipesDropdown';
import NumOfRecipesDisplay from './NumOfRecipesDisplay';

const rating = [1, 2, 3, 4, 5];
const time = [30, 45, 60, 90];
const level = ['Easy', 'Medium', 'Hard'];
const people = [1, 2, 3, 4];

function randomNum(num) {
  return Math.floor(Math.random() * num);
}

class Ingredient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientsList: [],
      allIngredients: [],
      filters: [],
      searchValue: '',
      recipesList: [],
      showRecipeList: false,
    };
  }

  componentDidMount() {
    const url = 'https://www.themealdb.com/api/json/v2/9973533/list.php?i=ingredient';
    axios
      .get(url)
      .then((response) => response.data.meals)
      .then((ingredientsData) => {
        this.setState({
          ingredientsList: ingredientsData,
          allIngredients: ingredientsData,
        });
      });
  }

  addFilter = (name) => {
    const { filters } = this.state;
    const currentFilters = [...filters];
    let newFilters = currentFilters;
    if (!currentFilters.includes(name)) {
      newFilters = [name, ...currentFilters];
    }
    this.setState({ filters: newFilters });
    this.addRecipesList(newFilters);
  }

  removeFilter = (name) => {
    const { filters } = this.state;
    const newFilters = filters.filter((filter) => filter !== name);
    this.setState({ filters: newFilters });
    this.addRecipesList(newFilters);
  }

  handleChange = (event) => {
    const { value } = event.target;
    const { allIngredients } = this.state;
    const filteredIngredients = allIngredients.filter((ingredient) => {
      return ingredient.strIngredient.toLowerCase().includes(value.toLowerCase());
    });
    this.setState({
      searchValue: value,
      ingredientsList: filteredIngredients,
    });
  }

  addRecipesList = (filters) => {
    let searchIngredients = null;
    if (filters.length === 1) {
      searchIngredients = filters[0].toLowerCase();
    }
    if (filters.length > 1) {
      searchIngredients = filters.map((filter) => filter.split(' ').join('_')).join(',').toLowerCase();
    }
    const url = `https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${searchIngredients}`;
    axios
      .get(url)
      .then((response) => response.data.meals)
      .then((recipesListData) => {
        if (searchIngredients === null) {
          this.setState({ recipesList: [] });
        } else if (recipesListData === null) {
          this.setState({ recipesList: recipesListData });
        } else {
          const updatedRecipesList = recipesListData.map((recipe) => {
            const extraInfo = {
              rating: rating[randomNum(5)],
              time: time[randomNum(4)],
              level: level[randomNum(3)],
              people: people[randomNum(4)],
            };
            return { ...recipe, ...extraInfo };
          });
          this.setState({ recipesList: updatedRecipesList });
        }
      });
  }

  displayRecipeList = () => {
    const { showRecipeList } = this.state;
    this.setState({ showRecipeList: !showRecipeList });
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
        from: 'ingredients',
      },
    });
  }

  render() {
    const {
      ingredientsList,
      filters,
      searchValue,
      recipesList,
      showRecipeList,
    } = this.state;
    return (
      <div className="ingredients-container">
        <h1>Ingredients</h1>
        {recipesList === null ? (
          <NumOfRecipesDisplay
            numOfRecipes={null}
            displayRecipeList={this.displayRecipeList}
          />
        )
          : (
            <NumOfRecipesDisplay
              numOfRecipes={recipesList.length}
              displayRecipeList={this.displayRecipeList}
              showRecipeList={showRecipeList}
            />
          )}
        <div className="recipes-list-container">
          {showRecipeList && recipesList !== null && recipesList.map((recipe) => (
            <RecipesDropdown
              key={recipe.idMeal}
              name={recipe.strMeal}
              rating={recipe.rating}
              time={recipe.time}
              level={recipe.level}
              people={recipe.people}
              selectRecipe={this.selectRecipe}
            />
          ))}
        </div>
        <SearchBar
          searchValue={searchValue}
          handleChange={this.handleChange}
        />
        <div className="filters-container">
          {filters.map((filter) => (
            <Filters
              key={filter}
              name={filter}
              removeFilter={this.removeFilter}
            />
          ))}
        </div>
        <div className="ingredients-cards-container">
          {ingredientsList.map((ingredient) => (
            <IngredientsList
              key={ingredient.idIngredient}
              name={ingredient.strIngredient}
              addFilter={this.addFilter}
            />
          ))}
        </div>
      </div>
    );
  }
}


export default Ingredient;
