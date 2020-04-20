import React from 'react';


class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };
  }

  render() {
    const { recipes } = this.state;
    return (
      <div>
        <h1>
          Recipes
          {recipes}
        </h1>
      </div>
    );
  }
}


export default Recipes;
