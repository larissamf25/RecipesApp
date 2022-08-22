import React from 'react';
import PropTypes from 'prop-types';

function FoodCard({ index, food }) {
  return (
    <div>
      <p data-testid={ `${index}-card-name` }>
        Nome:
        {' '}
        { food.strMeal }
      </p>
      <img
        style={ { width: '150px' } }
        src={ food.strMealThumb }
        alt={ food.strMeal }
        data-testid={ `${index}-card-img` }
        width="200px"
      />
    </div>
  );
}

FoodCard.propTypes = {
  index: PropTypes.number.isRequired,
  food: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FoodCard;
