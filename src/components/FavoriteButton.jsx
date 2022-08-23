import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import FavHeart from '../images/blackHeartIcon.svg';
import NotFavHeart from '../images/whiteHeartIcon.svg';
import saveLocalStore from '../pages/helpers/saveLocalStore';

function FavoriteButton() {
  const {
    recipe,
  } = useContext(RecipesContext);
  const [favoriteList, setFavoriteList] = useState([]);
  useEffect(() => {
    setFavoriteList(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);
  const { id } = useParams();
  const { pathname } = useLocation();
  const typeOfRecipe = pathname[1];
  const recipeKeys = {
    recipeName: (typeOfRecipe === 'f') ? 'strMeal' : 'strDrink',
    recipeImage: (typeOfRecipe === 'f') ? 'strMealThumb' : 'strDrinkThumb',
    recipeCategory: (typeOfRecipe === 'f') ? 'strCategory' : 'strAlcoholic',
  };
  const onFavoriteClick = () => {
    let currentFavoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!Array.isArray(currentFavoriteList)) currentFavoriteList = [];
    // console.log(currentFavoriteList);
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
  );
}

export default FavoriteButton;
