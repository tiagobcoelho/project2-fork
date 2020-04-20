import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';
import Ingredient from './components/ingredient';
import Recipes from './components/recipes';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={ingredientsList:[]}
  }

  componentDidMount(){
    const url = `https://www.themealdb.com/api/json/v1/1/list.php?i=ingredient`;
    axios
    .get(url)
    .then(response => response.data)
    .then(ingredientsData =>{
      this.setState({ingredientsList: ingredientsData})
    })
    console.log(ingredientsData)
  }



  render() {
    return(
    <div className="App">
      <Router>
        <div>

          <div>
            <button type="submit"><Link to="/ingredients">Go to Ingredients</Link></button>
          </div>

          <div>
            <button type="submit"><Link to="/recipes">Go to recipes</Link></button>
          </div>
          <Switch>
            <Route path="/ingredients">
              <Ingredient />
            </Route>
            <Route path="/recipes">
              <Recipes />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );

  }
    
}

export default App;
