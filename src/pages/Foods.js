import React, { useContext, useEffect, useState } from 'react';
import FoodCard from '../components/FoodCard';
import RecipesContext from '../context/RecipesContext';
import { fetchFoodAPI,
  fetchFoodAPIByCategory,
  fetchFoodCategories } from '../services/foodAPI';
import '../css/Foods.css';
import { Link } from 'react-router-dom';

function Foods() {
  const {
    setFoodList,
    foodList,
    foodCategories,
    setFoodCategories } = useContext(RecipesContext);
  const [localFoodList, setLocalFoodList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('All');
  useEffect(() => {
    const fetchAPI = async () => {
      const foodListRequest = await fetchFoodAPI();
      setFoodList(foodListRequest);
      const foodCategoriesRequest = await fetchFoodCategories();
      setFoodCategories(foodCategoriesRequest);
      setLocalFoodList(foodListRequest.slice(0, Number('12')));
    };
    fetchAPI();
  }, []);

  const categoryFilter = async ({ target }) => {
    const category = target.name;
    if (category === 'All' || category === currentCategory) {
      setLocalFoodList(foodList.slice(0, Number('12')));
      setCurrentCategory('All');
    } else {
      const filterdFoodList = await fetchFoodAPIByCategory(category);
      setLocalFoodList(filterdFoodList.slice(0, Number('12')));
      setCurrentCategory(category);
    }
  };

  return (
    <div>
      { localFoodList
        .map((food, idx) => (
          <div
            data-testid={ `${idx}-recipe-card` }
            key={ idx }
            style={ { width: '200px', border: '1px solid red' } }
          >
            <Link to={ `/foods/${food.idMeal}` }>
              <FoodCard food={ food } index={ idx } />
            </Link>
          </div>
        ))}
      <div className="categories-container">
        { foodCategories
          .slice(0, Number('5')).map((category, idx) => (
            <button
              type="button"
              key={ idx }
              name={ category.strCategory }
              onClick={ categoryFilter }
              data-testid={ `${category.strCategory}-category-filter` }
            >
              { category.strCategory }
            </button>
          ))}
        <button
          type="button"
          name="All"
          onClick={ categoryFilter }
          data-testid="All-category-filter"
        >
          All
        </button>
      </div>
    </div>
  );
}

export default Foods;
