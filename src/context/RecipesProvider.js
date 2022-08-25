import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [foodList, setFoodList] = useState([]);
  const [drinkList, setDrinkList] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchBarOption, setSearchBarOption] = useState('');
  const [recipe, setRecipe] = useState({});
  const [favoriteRecipesList, setFavoriteRecipesList] = useState([]);
  const [doneRecipesList, setDoneRecipesList] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState(
    { cocktails: {}, meals: {} },
  );

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
        searchValue,
        searchBarOption,
        setSearchValue,
        setSearchBarOption,
        recipe,
        setRecipe,
        favoriteRecipesList,
        setFavoriteRecipesList,
        doneRecipesList,
        setDoneRecipesList,
        inProgressRecipes,
        setInProgressRecipes,
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
