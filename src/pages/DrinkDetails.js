import React from 'react';
import propTypes from 'prop-types';

function DrinkDetails({ match: { params } }) {
  const { idDrink } = params;
  return (
    <div>
      <p>{idDrink}</p>
    </div>
  );
}

DrinkDetails.propTypes = {
  match: propTypes.objectOf(propTypes.objectOf(propTypes.string)).isRequired,
};

export default DrinkDetails;
