import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fixYoutubeURL from '../pages/helpers/fixYoutubeURL';
import { fetchDrinkRecomendations } from '../services/drinkAPI';
import { fetchFoodRecomendations } from '../services/foodAPI';
import RecomendationDrinkCard from './RecomendationDrinkCard';
import RecomendationFoodCard from './RecomendationFoodCard';

function RecipeDetails({ recipe, typeOfRecipe, recipeKeys }) {
  const { recipeName, recipeImage, recipeCategory } = recipeKeys;
  const [recomendations, setRecomendations] = useState([]);

  console.log(typeOfRecipe);

  useEffect(() => {
    const getRecomendations = async () => {
      if (typeOfRecipe === 'foods') {
        const sixRecomendations = (await fetchFoodRecomendations())
          .slice(0, Number('6'));
        setRecomendations(sixRecomendations);
      } else {
        const sixRecomendations = (await fetchDrinkRecomendations())
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
      <h1 data-testid="recipe-title">{ recipe[recipeName] }</h1>
      <img
        data-testid="recipe-photo"
        style={ { width: '150px' } }
        src={ recipe[recipeImage] }
        alt={ recipe[recipeName] }
      />
      <p data-testid="recipe-category">{recipe[recipeCategory]}</p>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      { listIngredients() }
      { recipe.strYoutube && <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ fixYoutubeURL(recipe.strYoutube) }
        title="YouTube video player"
        rameborder="0"
        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />}
      <div className="recomendations-container">
        { recomendations.map((recomendation, index) => (
          <div key={ index }>
            { typeOfRecipe === 'foods'
              ? <RecomendationFoodCard recomendation={ recomendation } index={ index } />
              : (
                <RecomendationDrinkCard
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
