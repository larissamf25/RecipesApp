import React from 'react';
import PropTypes from 'prop-types';

function DrinkCard({ index, drink }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <p data-testid={ `${index}-card-name` }>
        Nome:
        {' '}
        { drink.strDrink }
      </p>
      <img
        style={ { width: '150px' } }
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

DrinkCard.propTypes = {
  index: PropTypes.number.isRequired,
  drink: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DrinkCard;
