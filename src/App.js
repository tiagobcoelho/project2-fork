import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';
import Ingredient from './ingredient';
import Recipes from './recipes';

function App() {
  return (
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

export default App;
