import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import Recipes from './components/Recipes';
import Ingredient from './components/Ingredient';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Recipe from './components/Recipe';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/ingredients" component={Ingredient} />
          <Route path="/recipes" component={Recipes} />
          <Route path="/recipe" component={Recipe} />
        </Switch>
      </Router>
    </div>
  );
}


export default App;
