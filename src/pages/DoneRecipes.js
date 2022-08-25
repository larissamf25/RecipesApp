import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import SavedRecipes from '../components/SavedRecipes';
import RecipesContext from '../context/RecipesContext';

function DoneRecipes() {
  const { setDoneRecipesList } = useContext(RecipesContext);

  useEffect(() => {
    setDoneRecipesList(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  return (
    <div>
      <Header />
      <SavedRecipes />
    </div>
  );
}

export default DoneRecipes;
