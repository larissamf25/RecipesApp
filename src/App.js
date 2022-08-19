import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Drinks from './pages/Drinks';
import Foods from './pages/Foods';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="meals">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ Login } exact />
          <Route path="/drinks" component={ Drinks } />
          <Route path="/foods" component={ Foods } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
