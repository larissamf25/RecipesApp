import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Drinks from './pages/Drinks';
import Foods from './pages/Foods';
import Login from './pages/Login/Login';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';

function App() {
  return (
    <div className="meals">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ Login } exact />
          <Route
            path="/drinks/:idDrink"
            render={ (props) => <DrinkDetails { ...props } /> }
          />
          <Route path="/drinks" component={ Drinks } />
          <Route
            path="/foods/:idFood"
            render={ (props) => <FoodDetails { ...props } /> }
          />
          <Route path="/foods" component={ Foods } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
