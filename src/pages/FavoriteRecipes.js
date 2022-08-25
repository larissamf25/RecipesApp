import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import SavedRecipes from '../components/SavedRecipes';
import RecipesContext from '../context/RecipesContext';

function FavoriteRecipes() {
  const { setFavoriteRecipesList } = useContext(RecipesContext);

  useEffect(() => {
    setFavoriteRecipesList(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  return (
    <div>
      <Header />
      <SavedRecipes />
    </div>
  );
}

export default FavoriteRecipes;
