import React, { useContext, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import RecipesContext from '../context/RecipesContext';
import fetchFoodAPI from '../services/foodAPI';

function Foods() {
  const { setFoodList, foodList } = useContext(RecipesContext);
  useEffect(() => {
    const fetchAPI = async () => {
      const foodListRequest = await fetchFoodAPI();
      setFoodList(foodListRequest);
    };
    fetchAPI();
  }, []);
  return (
    <div>
      { foodList
        .slice(0, Number('12'))
        .map((food, idx) => <FoodCard key={ idx } food={ food } index={ idx } />)}
    </div>
  );
}

export default Foods;
