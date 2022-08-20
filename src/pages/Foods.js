import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { fetchRecipesByIngredient,
  fetchRecipesByLetter,
  fetchRecipesByName } from '../helper/searchOptions';

function Foods() {
  const { searchBarOption, searchValue, setSearchBarOption } = useContext(RecipesContext);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (searchBarOption.length > 0 && searchValue.length <= 1) {
      const verifySearchValue = async () => {
        if (searchBarOption === 'ingredientSearch') {
          setRecipes(await fetchRecipesByIngredient(searchValue));
          setSearchBarOption('');
        } if (searchBarOption === 'ingredientSearch') {
          setRecipes(await fetchRecipesByLetter(searchValue));
          setSearchBarOption('');
        }
        setRecipes(await fetchRecipesByName(searchValue));
        setSearchBarOption('');
      };
      verifySearchValue();
      setSearchBarOption('');
    }
  }, [searchBarOption]);

  return (
    <div>
      <Header />
      <h1>Foods Page</h1>
      {
        (recipes.length > 0)
         && recipes.map((recipe) => (
           <div key={ recipe.idMeal }>
             <h1>{recipe.strMeal}</h1>
             <img src={ recipe.strMealThumb } alt={ recipe.strMeal } width="200px" />
           </div>
         ))
      }
    </div>
  );
}

export default Foods;
