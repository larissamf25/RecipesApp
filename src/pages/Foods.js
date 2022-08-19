import React, { useContext, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import RecipesContext from '../context/RecipesContext';
import { fetchFoodAPI, fetchFoodCategories } from '../services/foodAPI';

function Foods() {
  const {
    setFoodList,
    foodList,
    foodCategories,
    setFoodCategories } = useContext(RecipesContext);
  useEffect(() => {
    const fetchAPI = async () => {
      const foodListRequest = await fetchFoodAPI();
      setFoodList(foodListRequest);
      const foodCategoriesRequest = await fetchFoodCategories();
      setFoodCategories(foodCategoriesRequest);
    };
    fetchAPI();
  }, []);
  return (
    <div>
      { foodList
        .slice(0, Number('12'))
        .map((food, idx) => <FoodCard key={ idx } food={ food } index={ idx } />)}
      { foodCategories
        .slice(0, Number('5')).map((category, idx) => (
          <button
            type="button"
            key={ idx }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            { category.strCategory }
          </button>
        ))}
    </div>
  );
}

export default Foods;
