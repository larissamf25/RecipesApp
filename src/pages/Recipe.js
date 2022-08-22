import React from 'react';
import { useParams } from 'react-router-dom';

function Recipe() {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>Recipe details</h1>
    </div>
  );
}

export default Recipe;
