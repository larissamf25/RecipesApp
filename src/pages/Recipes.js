import React, { useContext, useEffect } from 'react';
import '../style/Footer.css';
import '../style/Recipes.css';
import { useLocation, useParams, Link } from 'react-router-dom';
import { fecthFoodById } from '../services/foodAPI';
import { fecthDrinkById } from '../services/drinkAPI';
import RecipeDetails from '../components/RecipeDetails';
import RecipesContext from '../context/RecipesContext';
import saveLocalStore from './helpers/saveLocalStore';

function Recipes() {
  const {
    recipe,
    setRecipe,
    doneRecipesList,
    setDoneRecipesList,
    inProgressRecipes,
    setInProgressRecipes,
  } = useContext(RecipesContext);

  const { id } = useParams();
  const { pathname } = useLocation();
  const lastIndexOfSlash = pathname.lastIndexOf('/');
  const typeOfRecipe = pathname.slice(1, lastIndexOfSlash);
  const typeByMealAndCocktails = (typeOfRecipe === 'foods') ? 'meals' : 'cocktails';
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
    setDoneRecipesList(JSON.parse(localStorage.getItem('doneRecipes')));
    if (JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      setInProgressRecipes(JSON.parse(localStorage.getItem('inProgressRecipes')));
    } else {
      saveLocalStore('inProgressRecipes', inProgressRecipes);
    }
  }, []);

  return (
    <div className="recipe-details">
      <RecipeDetails
        recipe={ recipe }
        typeOfRecipe={ typeOfRecipe }
        recipeKeys={ recipeKeys }
      />
      { (!doneRecipesList || !doneRecipesList
        .some((currentRecipe) => currentRecipe.id === id))
        && (
          <Link
            className="main-footer"
            to={ typeOfRecipe === 'foods'
              ? `/foods/${id}/in-progress` : `/drinks/${id}/in-progress` }
            data-testid="start-recipe-btn"
          >
            { Object.keys(inProgressRecipes[typeByMealAndCocktails]).includes(id)
              ? 'Continue Recipe' : 'Start Recipe' }
          </Link>
        )}
    </div>
  );
}

export default Recipes;
