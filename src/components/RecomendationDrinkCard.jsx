import PropTypes from 'prop-types';
import React from 'react';

function RecomendationDrinkCard({ recomendation, index }) {
  const { strDrink, strDrinkThumb } = recomendation;
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      <p
        data-testid={ `${index}-recomendation-title` }
      >
        {strDrink}

      </p>
      <img
        width="100px"
        src={ strDrinkThumb }
        alt={ strDrink }
      />
    </div>
  );
}

RecomendationDrinkCard.propTypes = {
  index: PropTypes.number.isRequired,
  recomendation: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};

export default RecomendationDrinkCard;
