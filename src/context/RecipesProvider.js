import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [foodList, setFoodList] = useState([]);
  const [drinkList, setDrinkList] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  return (
    <RecipesContext.Provider
      value={ {
        foodList,
        drinkList,
        setFoodList,
        setDrinkList,
        drinkCategories,
        setDrinkCategories,
        foodCategories,
        setFoodCategories,
      } }
    >
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
