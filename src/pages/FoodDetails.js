import React from 'react';
import propTypes from 'prop-types';

function FoodDetails({ match: { params } }) {
  const { idFood } = params;
  return (
    <div>
      <p>{idFood}</p>
    </div>
  );
}

FoodDetails.propTypes = {
  match: propTypes.objectOf(propTypes.objectOf(propTypes.string)).isRequired,
};

export default FoodDetails;
