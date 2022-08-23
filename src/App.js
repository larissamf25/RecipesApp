import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Favorites from './pages/Favorites';
import Done from './pages/Done';
import Recipes from './pages/Recipes';
import RecipesProvider from './context/RecipesProvider';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <Switch>
          <Route path="/" component={ Login } exact />
          <Route exact path="/" component={ Login } />
          <Route path="/foods/:id" component={ Recipes } exact />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/foods/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/drinks/:id" component={ Recipes } />
          <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ Done } />
          <Route path="/favorite-recipes" component={ Favorites } />

        </Switch>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
