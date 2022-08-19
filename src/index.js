import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RecipesProvider from './context/RecipesProvider';

ReactDOM.render(
  <RecipesProvider>
    <App />
  </RecipesProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
