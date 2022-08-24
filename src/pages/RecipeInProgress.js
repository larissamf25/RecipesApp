import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import RecipesContext from '../context/RecipesContext';
import { fecthDrinkById } from '../services/drinkAPI';
import { fecthFoodById } from '../services/foodAPI';
import saveLocalStore from './helpers/saveLocalStore';

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const typeOfRecipe = pathname[1];
  const inEnglishTypoOfRec = typeOfRecipe === 'f' ? 'meals' : 'cocktails';
  const recipeKeys = {
    recipeName: (typeOfRecipe === 'f') ? 'strMeal' : 'strDrink',
    recipeImage: (typeOfRecipe === 'f') ? 'strMealThumb' : 'strDrinkThumb',
    recipeCategory: (typeOfRecipe === 'f') ? 'strCategory' : 'strAlcoholic',
  };
  const [numberOfIngredients, setNumberOfIngredients] = useState(0);
  const {
    recipe,
    setRecipe,
  } = useContext(RecipesContext);

  const [checkedIngredients, setCheckedIngredientes] = useState([]);

  useEffect(() => {
    const getRecipe = async () => {
      if (typeOfRecipe === 'f') {
        setRecipe(await fecthFoodById(id));
        setNumberOfIngredients(document.querySelectorAll('li').length);
      } else {
        setRecipe(await fecthDrinkById(id));
        setNumberOfIngredients(document.querySelectorAll('li').length);
      }
    };
    getRecipe();

    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      saveLocalStore('inProgressRecipes', { cocktails: {}, meals: {} });
    }
    let locStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const savedCheckedIngredientsById = JSON
      .parse(localStorage.getItem('inProgressRecipes'))[inEnglishTypoOfRec][id];
    locStorage = {
      ...locStorage,
      [inEnglishTypoOfRec]: {
        ...locStorage[inEnglishTypoOfRec], [id]: [] } };
    if (savedCheckedIngredientsById) {
      setCheckedIngredientes(savedCheckedIngredientsById);
    } else {
      saveLocalStore('inProgressRecipes', locStorage);
    }
  }, []);

  useEffect(() => {
    let locStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    locStorage = {
      ...locStorage,
      [inEnglishTypoOfRec]: {
        ...locStorage[inEnglishTypoOfRec], [id]: checkedIngredients } };
    saveLocalStore('inProgressRecipes', locStorage);
  }, [checkedIngredients]);

  const onCheckboxClick = ({ target }) => {
    console.log(target.name);
    const newCheckedList = checkedIngredients
      .some((ingredient) => ingredient === Number(target.name))
      ? checkedIngredients.filter((ingredient) => ingredient !== Number(target.name))
      : [...checkedIngredients, Number(target.name)];
    setCheckedIngredientes(newCheckedList);
  };

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
            <input
              type="checkbox"
              onChange={ onCheckboxClick }
              name={ index }
              checked={ checkedIngredients.includes(index) }
            />
            <span
              style={ { textDecoration: checkedIngredients.includes(index)
                ? 'line-through'
                : 'none' } }
            >
              { `${recipe[`strMeasure${index}`]} ${recipe[`strIngredient${index}`]}` }
            </span>
          </li>,
        );
      }
    }
    return <ul>{ingredients}</ul>;
  };

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
        disabled={ checkedIngredients.length !== numberOfIngredients
          || checkedIngredients.length === 0 }
        onClick={ () => {} }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
