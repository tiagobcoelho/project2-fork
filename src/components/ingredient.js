import React from 'react';
import axios from 'axios';
import IngredientsList from './IngredientsList';


class Ingredient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientsList: [],
    };
  }

  componentDidMount() {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=ingredient';
    axios
      .get(url)
      .then((response) => response.data.meals)
      .then((ingredientsData) => {
        this.setState({ ingredientsList: ingredientsData });
      });
  }


  render() {
    const { ingredientsList } = this.state;
    return (
      <div>
        <h1>Ingredients</h1>
        {ingredientsList.map((ingredient) => (
          <IngredientsList
            key={ingredient.idIngredient}
            name={ingredient.strIngredient}
          />
        ))}

      </div>
    );
  }
}


export default Ingredient;
