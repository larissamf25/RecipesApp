import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fixYoutubeURL from '../pages/helpers/fixYoutubeURL';
import { fetchDrinkRecomendations } from '../services/drinkAPI';
import { fetchFoodRecomendations } from '../services/foodAPI';
import RecomendationDrinkCard from './RecomendationDrinkCard';
import RecomendationFoodCard from './RecomendationFoodCard';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

function RecipeDetails({ recipe, typeOfRecipe, recipeKeys }) {
  const { recipeName, recipeImage, recipeCategory } = recipeKeys;
  const [recomendations, setRecomendations] = useState([]);

  // console.log(typeOfRecipe);

  useEffect(() => {
    const getRecomendations = async () => {
      if (typeOfRecipe === 'foods') {
        const sixRecomendations = (await fetchDrinkRecomendations())
          .slice(0, Number('6'));
        setRecomendations(sixRecomendations);
      } else {
        const sixRecomendations = (await fetchFoodRecomendations())
          .slice(0, Number('6'));
        setRecomendations(sixRecomendations);
      }
    };
    getRecomendations();
  }, []);

  const listIngredients = () => {
    const maxIngredients = 20;
    const ingredients = [];
    for (let index = 1; index <= maxIngredients; index += 1) {
      if (recipe[`strIngredient${index}`]) {
        ingredients.push(
          <li
            data-testid={ `${index - 1}-ingredient-name-and-measure` }
            key={ index }
          >
            { recipe[`strMeasure${index}`] }
            { recipe[`strIngredient${index}`] }
          </li>,
        );
      }
    }
    return <ul>{ingredients}</ul>;
  };
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe[recipeImage] }
        alt={ recipe[recipeName] }
      />
      <div className="recipe-infos">
        <div className="icons-container">
          <FavoriteButton recipe={ recipe } dataTestId="favorite-btn" />
          <ShareButton />
        </div>
        <h1 data-testid="recipe-title">{ recipe[recipeName] }</h1>
        <p id="recipe-category" data-testid="recipe-category">{recipe[recipeCategory]}</p>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
        { listIngredients() }
      </div>
      { recipe.strYoutube && <iframe
        data-testid="video"
        width="100%"
        height="200"
        src={ fixYoutubeURL(recipe.strYoutube) }
        title="YouTube video player"
        rameborder="0"
        allowFullScreen
      />}
      <p id="recomendations-title">Recomendations</p>
      <div className="recomendations-container">
        { recomendations.map((recomendation, index) => (
          <div key={ index } className="recomendation-card">
            { typeOfRecipe === 'foods'
              ? <RecomendationDrinkCard recomendation={ recomendation } index={ index } />
              : (
                <RecomendationFoodCard
                  recomendation={ recomendation }
                  index={ index }
                />)}
          </div>
        )) }
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strYoutube: PropTypes.string,
    strAlcoholic: PropTypes.string,
  }).isRequired,
  recipeKeys: PropTypes.shape({
    recipeName: PropTypes.string,
    recipeImage: PropTypes.string,
    recipeCategory: PropTypes.string,
  }).isRequired,
  typeOfRecipe: PropTypes.string.isRequired,
};

export default RecipeDetails;
