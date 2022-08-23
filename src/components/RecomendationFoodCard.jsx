import PropTypes from 'prop-types';
import React from 'react';

function RecomendationFoodCard({ recomendation, index }) {
  const { strMeal, strMealThumb } = recomendation;
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      <p
        data-testid={ `${index}-recomendation-title` }
      >
        {strMeal}

      </p>
      <img
        width="190px"
        src={ strMealThumb }
        alt={ strMeal }
      />
    </div>
  );
}

RecomendationFoodCard.propTypes = {
  index: PropTypes.number.isRequired,
  recomendation: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
};

export default RecomendationFoodCard;
