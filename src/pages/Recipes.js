import React, { useContext, useEffect } from 'react';
import '../style/Footer.css';
import { useLocation, useParams, Link } from 'react-router-dom';
import { fecthFoodById } from '../services/foodAPI';
import { fecthDrinkById } from '../services/drinkAPI';
import RecipeDetails from '../components/RecipeDetails';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import RecipesContext from '../context/RecipesContext';

function Recipes() {
  const {
    recipe,
    setRecipe,
  } = useContext(RecipesContext);
  const { id } = useParams();
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
    <>
      <RecipeDetails
        recipe={ recipe }
        typeOfRecipe={ typeOfRecipe }
        recipeKeys={ recipeKeys }
      />
      <Link
        className="main-footer"
        to={ typeOfRecipe === 'foods'
          ? `/foods/${id}/in-progress` : `/drinks/${id}/in-progress` }
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </Link>
      <ShareButton />
      <FavoriteButton recipe={ recipe } dataTestId="favorite-btn" />
    </>
  );
}

export default Recipes;
