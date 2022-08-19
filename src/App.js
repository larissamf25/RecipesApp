import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Profile from './pages/Profile';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Favorites from './pages/Favorites';
import Done from './pages/Done';

function App() {
  return (
    <Switch>
      <Route path="/foods" exact component={ Foods } />
      <Route path="/drinks" exact component={ Drinks } />
      <Route path="/profile" exact component={ Profile } />
      <Route path="/done-recipes" exact component={ Done } />
      <Route path="/favorite-recipes" exact component={ Favorites } />
    </Switch>
  );
}

export default App;
