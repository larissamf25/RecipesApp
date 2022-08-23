import PropTypes from 'prop-types';
import React from 'react';

function RecomendationDrinkCard({ recomendation, index }) {
  const { strDrink } = recomendation;
  return (
    <div data-testid={ `${index}-recomendation-card` }>{ strDrink }</div>
  );
}

RecomendationDrinkCard.propTypes = {
  index: PropTypes.number.isRequired,
  recomendation: PropTypes.shape({
    strDrink: PropTypes.string,
  }).isRequired,
};

export default RecomendationDrinkCard;
