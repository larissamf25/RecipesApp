import React, { useEffect, useState } from 'react';
import '../style/Footer.css';
import { useLocation, useParams, Link } from 'react-router-dom';
import { fecthFoodById } from '../services/foodAPI';
import { fecthDrinkById } from '../services/drinkAPI';
import RecipeDetails from '../components/RecipeDetails';
import ShareImg from '../images/shareIcon.svg';
import FavHeart from '../images/blackHeartIcon.svg';
import NotFavHeart from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

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

  const [shareClick, setShareClick] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    const getRecipe = async () => {
      if (typeOfRecipe === 'foods') {
        setRecipe(await fecthFoodById(id));
      } else {
        setRecipe(await fecthDrinkById(id));
      }
    };
    getRecipe();
    setFavoriteList(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const saveLocalStore = (key, data) => localStorage
    .setItem(key, JSON.stringify(data));

  const onShareClick = () => {
    copy(`http://localhost:3000${pathname}`);
    setShareClick(true);
  };

  const onFavoriteClick = () => {
    let currentFavoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!Array.isArray(currentFavoriteList)) currentFavoriteList = [];
    console.log(currentFavoriteList);
    if (currentFavoriteList.some((item) => item.id === id)) {
      const filteredList = currentFavoriteList.filter((item) => item.id !== id);
      setFavoriteList(filteredList);
      saveLocalStore('favoriteRecipes', filteredList);
    } else {
      saveLocalStore('favoriteRecipes', [...currentFavoriteList,
        {
          id,
          type: typeOfRecipe.slice(0, Number('-1')),
          nationality: recipe.strArea ? recipe.strArea : '',
          category: recipe.strCategory,
          alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
          name: recipe[recipeKeys.recipeName],
          image: recipe[recipeKeys.recipeImage],
        }]);
      setFavoriteList(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  };

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
      <button
        type="button"
        data-testid="share-btn"
        onClick={ onShareClick }
        style={ { margin: '20px' } }
      >
        <img src={ ShareImg } alt="Share Recipe" />
      </button>
      {shareClick && <span>Link copied!</span>}
      <button
        type="button"
        onClick={ onFavoriteClick }
      >
        {favoriteList && favoriteList
          .some((favItem) => favItem.id === id)
          ? <img src={ FavHeart } alt="Receita Favoritada" data-testid="favorite-btn" />
          : (
            <img
              src={ NotFavHeart }
              alt="Receita não Favoritada"
              data-testid="favorite-btn"
            />
          )}
      </button>
    </>
  );
}

export default Recipes;
