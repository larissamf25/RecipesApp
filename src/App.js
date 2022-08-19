import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="meals">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ Login } exact />
          <Route path="/foods" exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
