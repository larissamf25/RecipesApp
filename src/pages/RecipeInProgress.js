import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import RecipesContext from '../context/RecipesContext';
import { fecthDrinkById } from '../services/drinkAPI';
import { fecthFoodById } from '../services/foodAPI';

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const typeOfRecipe = pathname[1];
  const recipeKeys = {
    recipeName: (typeOfRecipe === 'f') ? 'strMeal' : 'strDrink',
    recipeImage: (typeOfRecipe === 'f') ? 'strMealThumb' : 'strDrinkThumb',
    recipeCategory: (typeOfRecipe === 'f') ? 'strCategory' : 'strAlcoholic',
  };
  const {
    recipe,
    setRecipe,
  } = useContext(RecipesContext);

  useEffect(() => {
    const getRecipe = async () => {
      if (typeOfRecipe === 'f') {
        setRecipe(await fecthFoodById(id));
      } else {
        setRecipe(await fecthDrinkById(id));
      }
    };
    getRecipe();
  }, []);

  const listIngredients = () => {
    const maxIngredients = 20;
    const ingredients = [];
    for (let index = 1; index <= maxIngredients; index += 1) {
      if (recipe[`strIngredient${index}`]) {
        ingredients.push(
          <li
            data-testid={ `${index - 1}-ingredient-step` }
            key={ index }
          >
            <input type="checkbox" onChange={ () => {} } checked={ () => {} } />
            <span>{ recipe[`strMeasure${index}`] }</span>
            <span>{ recipe[`strIngredient${index}`] }</span>
          </li>,
        );
      }
    }
    return <ul>{ingredients}</ul>;
  };
  console.log(id);
  return (
    <div>
      <h2 data-testid="recipe-title">{ recipe[recipeKeys.recipeName] }</h2>
      <img
        src={ recipe[recipeKeys.recipeImage] }
        alt={ recipe[recipeKeys.recipeName] }
        data-testid="recipe-photo"
        width="200px"
      />
      <FavoriteButton />
      <ShareButton />
      <p data-testid="recipe-category">{ recipe[recipeKeys.recipeCategory]}</p>
      {listIngredients()}
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => {} }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default RecipeInProgress;
