import React from 'react';
import axios from 'axios';
import IngredientsList from './IngredientsSubcomponents/IngredientsList';
import Filters from './IngredientsSubcomponents/Filters';
import SearchBar from '../SharedComponents/SearchBar/SearchBar';
import RecipesList from '../SharedComponents/RecipesList/RecipesList';
import NumOfRecipesDisplay from './IngredientsSubcomponents/NumOfRecipesDisplay';
import './ingredients.scss';
import SortBy from '../SharedComponents/SortBy/SortBy';


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
      bottomTabExpanded: false,
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
          this.setState({ recipesList: null });
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
          const sortedList = updatedRecipesList.sort((mealA, mealB) => {
            return mealB.rating - mealA.rating;
          });
          this.setState({ recipesList: sortedList });
        }
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
        from: 'ingredients',
      },
    });
  }

  handleSortByChange = (event) => {
    const { value } = event.target;
    const { recipesList } = this.state;
      if (value === 'time' ) {
        const sortedList = recipesList.sort((mealA, mealB) => {
          return mealA.time - mealB.time;
        });
        this.setState({ recipesList: sortedList });
      } else {
        const sortedList = recipesList.sort((mealA, mealB) => {
          return mealB.rating - mealA.rating;
        });
        this.setState({ recipesList: sortedList });
      }
  }

  toggleBottomTab = () => {
    const { bottomTabExpanded } = this.state;
    this.setState({ bottomTabExpanded: !bottomTabExpanded })

  }

  render() {
    const {
      ingredientsList,
      filters,
      searchValue,
      recipesList,
      bottomTabExpanded,
    } = this.state;
    console.log(recipesList)

    return (
      <div className="page-wrapper">
      <div className="ingredients-left-container">
        <h1 className='ingredients-title'>Ingredients</h1>
        <SearchBar
          searchValue={searchValue}
          handleChange={this.handleChange}
          placeholder={'search ingredient'}
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
      <div className={bottomTabExpanded ? "ingredients-container-bottom" : "ingredients-container-right"}>
      <NumOfRecipesDisplay
        numOfRecipes={recipesList === null ? null : recipesList.length}
        toggleBottomTab={this.toggleBottomTab}
        bottomTabExpanded={bottomTabExpanded}
      />
          {recipesList !== null && recipesList.length > 0 && (
            <SortBy handleSortByChange={this.handleSortByChange} bottomTabExpanded={bottomTabExpanded} />
          )}
        <div className={bottomTabExpanded ? "recipes-list-container-bottom" : "recipes-list-container"}>
          {recipesList !== null && recipesList.map((recipe) => (       
            <RecipesList
              key={recipe.idMeal}
              name={recipe.strMeal}
              thumbnail={recipe.strMealThumb}
              rating={recipe.rating}
              time={recipe.time}
              level={recipe.level}
              people={recipe.people}
              selectRecipe={this.selectRecipe}
            />
          ))}
        </div>
      </div>
      </div>
    );
  }
}


export default Ingredient;
