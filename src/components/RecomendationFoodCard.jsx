import PropTypes from 'prop-types';
import React from 'react';

function RecomendationFoodCard({ recomendation, index }) {
  const { strMeal } = recomendation;
  console.log(strMeal);
  return (
    <div data-testid={ `${index}-recomendation-card` }>{ strMeal }</div>
  );
}

RecomendationFoodCard.propTypes = {
  index: PropTypes.number.isRequired,
  recomendation: PropTypes.shape({
    strMeal: PropTypes.string,
  }).isRequired,
};

export default RecomendationFoodCard;
