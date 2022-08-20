import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Favorites from './pages/Favorites';
import Done from './pages/Done';
// import Recipe from './pages/Recipe';
// import InProgress from './pages/InProgress';

function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Foods } />
          {/* <Route exact path="/foods/:id" component={ Recipe } />
      <Route exact path="/foods/:id/in-progress" component={ InProgress } />
      <Route exact path="/drinks/:id" component={ Recipe } />
      <Route exact path="/drinks/:id/in-progress" component={ InProgress } /> */}
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
