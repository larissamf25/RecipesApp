import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import FavHeart from '../images/blackHeartIcon.svg';
import NotFavHeart from '../images/whiteHeartIcon.svg';
import saveLocalStore from '../pages/helpers/saveLocalStore';
import RecipesContext from '../context/RecipesContext';

function FavoriteButton({ recipe, dataTestId }) {
  const { favoriteRecipesList, setFavoriteRecipesList } = useContext(RecipesContext);
  useEffect(() => {
    setFavoriteRecipesList(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);
  const { id: idFromParams } = useParams();
  const id = recipe.id ? recipe.id : idFromParams;
  const { pathname } = useLocation();
  const typeOfRecipe = recipe.type ? recipe.type[0] : pathname[1];
  const recipeKeys = {
    recipeName: (typeOfRecipe === 'f') ? 'strMeal' : 'strDrink',
    recipeImage: (typeOfRecipe === 'f') ? 'strMealThumb' : 'strDrinkThumb',
    recipeCategory: (typeOfRecipe === 'f') ? 'strCategory' : 'strAlcoholic',
  };

  const onFavoriteClick = () => {
    let currentFavoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!Array.isArray(currentFavoriteList)) currentFavoriteList = [];
    if (currentFavoriteList.some((item) => item.id === id)) {
      const filteredList = currentFavoriteList.filter((item) => item.id !== id);
      setFavoriteRecipesList(filteredList);
      setFavoriteRecipesList(filteredList);
      saveLocalStore('favoriteRecipes', filteredList);
    } else {
      saveLocalStore('favoriteRecipes', [...currentFavoriteList,
        {
          id,
          type: typeOfRecipe === 'f' ? 'food' : 'drink',
          nationality: recipe.strArea ? recipe.strArea : '',
          category: recipe.strCategory,
          alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
          name: recipe[recipeKeys.recipeName],
          image: recipe[recipeKeys.recipeImage],
        }]);
      setFavoriteRecipesList(JSON.parse(localStorage.getItem('favoriteRecipes')));
      setFavoriteRecipesList(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  };
  return (
    <button
      type="button"
      onClick={ onFavoriteClick }
    >
      {favoriteRecipesList && favoriteRecipesList
        .some((favItem) => favItem.id === id)
        ? <FaHeart font-size="30px" color="black" />
        : (
          <FiHeart font-size="30px" color="black" />
        )}
    </button>
  );
}

FavoriteButton.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.number,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default FavoriteButton;
