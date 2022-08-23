import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fecthFoodById } from '../services/foodAPI';
import { fecthDrinkById } from '../services/drinkAPI';
import RecipeDetails from '../components/RecipeDetails';

function Recipes() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const { pathname } = useLocation();
  const lastIndexOfSlash = pathname.lastIndexOf('/');
  const typeOfRecipe = pathname.slice(1, lastIndexOfSlash);
  const recipeKeys = {
    recipeName: (typeOfRecipe === 'foods') ? 'strMeal' : 'strDrink',
    recipeImage: (typeOfRecipe === 'foods') ? 'strMealThumb' : 'strDrinkThumb',
    recipeCategory: (typeOfRecipe === 'foods') ? 'strCategory' : 'strAlcoholic',
  };

  useEffect(() => {
    const getRecipe = async () => {
      if (typeOfRecipe === 'foods') {
        setRecipe(await fecthFoodById(id));
      } else {
        setRecipe(await fecthDrinkById(id));
      }
    };
    getRecipe();
  }, []);

  return (
    <RecipeDetails
      recipe={ recipe }
      typeOfRecipe={ typeOfRecipe }
      recipeKeys={ recipeKeys }
    />
  );
}

export default Recipes;
