import React from 'react';


class Ingredient extends React.Component {
  constructor() {
    super();
    this.state = {
      ingredients: [],
    };
  }


  render() {
    const { ingredients } = this.state;
    return (
      <div>
        <h1>Ingredients</h1>
        {ingredients}
      </div>
    );
  }
}

export default Ingredient;
