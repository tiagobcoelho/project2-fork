import React from 'react';
import axios from 'axios';
import CategoriesList from './RecipesSubcomponents/CategoriesList';
import SearchBar from '../SharedComponents/SearchBar/SearchBar';
import RecipesList from '../SharedComponents/RecipesList/RecipesList';
import SortBy from '../SharedComponents/SortBy/SortBy';
import { IoMdClose } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import './recipes.scss';


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
      mealsList: [],
      bottomTabExpanded: false,
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
        const sortedList = updatedRecipesList.sort((mealA, mealB) => {
          return mealB.rating - mealA.rating;
        });
        this.setState({
          searchValue:'',
          chosenCategory: name,
          mealsList: sortedList,
          bottomTabExpanded:true,
        });
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
            const sortedList = updatedRecipesList.sort((mealA, mealB) => {
              return mealB.rating - mealA.rating;
            });
            this.setState({
              searchValue: value,
              mealsList: sortedList,
              chosenCategory: ''
            });
          } else {
            this.setState({
              searchValue: value,
              mealsList: [],
              chosenCategory: ''
            });
          }
        });
    } else {
      this.setState({
        searchValue: value,
        mealsList: [],
        chosenCategory:''
      });
    }
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

  handleSortByChange = (event) => {
    const { value } = event.target;
    const { mealsList } = this.state;
      if (value === 'time' ) {
        const sortedList = mealsList.sort((mealA, mealB) => {
          return mealA.time - mealB.time;
        });
        this.setState({ mealsList: sortedList });
      } else {
        const sortedList = mealsList.sort((mealA, mealB) => {
          return mealB.rating - mealA.rating;
        });
        this.setState({ mealsList: sortedList });
      }
  }

  toggleBottomTab = () => {
    const { bottomTabExpanded } = this.state;
    this.setState({
      bottomTabExpanded: !bottomTabExpanded,
      chosenCategory: ''
    })

  }

  render() {
    const {
      searchValue,
      categories,
      chosenCategory,
      mealsList,
      bottomTabExpanded
    } = this.state;

    return (
      <div className='page-wrapper'>
      <div className="recipes-container-left">
        <h1 className='categories-title'>Recipes</h1>
        <SearchBar
          searchValue={searchValue}
          handleChange={this.searchMealByName}
          placeholder={'search recipe by name'}
        />
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
        </div>
        <div className={bottomTabExpanded ? "recipes-container-bottom" : "recipes-container-right"}>
        {chosenCategory === "" && searchValue === "" && (
          <div className='search-info'>
            <p>choose a <span>category</span> or search recipe by <span>name</span></p>
          </div>
        )}
        {chosenCategory !== "" && searchValue === "" && (
          <div className='search-info'>
            <p>all recipes for <span>{chosenCategory}</span></p>
            <IoMdClose className='icon' onClick={this.toggleBottomTab}/>
          </div>
        )}
        {searchValue !== "" && mealsList.length !== 0 && (
          <div className='search-info'>
            <p><span>{mealsList.length}</span> recipes avalible</p>
            {bottomTabExpanded ? <IoIosArrowDown className='icon' onClick={this.toggleBottomTab} /> : <IoIosArrowUp className='icon' onClick={this.toggleBottomTab} />}
          </div>
        )}
        {(chosenCategory !== "" || searchValue !== "" && mealsList.length !== 0) && <SortBy handleSortByChange={this.handleSortByChange} bottomTabExpanded={bottomTabExpanded} />}
        {(chosenCategory !== "" || searchValue !== "") && (
          mealsList.length === 0 ? (
            <div className='search-info'>
              <p><span>sorry,</span> no recipes match your search</p>
            </div>
          )
            : (
              <div className={bottomTabExpanded ? "recipes-list-container-bottom" : "recipes-list-container"}>
                {mealsList.map((meal) => (
                  <RecipesList
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
      </div>
    );
  }
}


export default Recipes;
