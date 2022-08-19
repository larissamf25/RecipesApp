import React, { useContext, useEffect } from 'react';
import DrinkCard from '../components/DrinkCard';
import RecipesContext from '../context/RecipesContext';
import { fetchDrinkAPI, fetchDrinkCategories } from '../services/drinkAPI';

function Drinks() {
  const {
    setDrinkList,
    drinkList,
    drinkCategories,
    setDrinkCategories,
  } = useContext(RecipesContext);
  useEffect(() => {
    const fetchAPI = async () => {
      const drinkListRequest = await fetchDrinkAPI();
      setDrinkList(drinkListRequest);
      const drinkCategoriesRequest = await fetchDrinkCategories();
      setDrinkCategories(drinkCategoriesRequest);
    };
    fetchAPI();
  }, []);
  return (
    <div>
      { drinkList
        .slice(0, Number('12'))
        .map((drink, idx) => <DrinkCard key={ idx } drink={ drink } index={ idx } />)}
      { drinkCategories.slice(0, Number('5')).map((category, idx) => (
        <button
          key={ idx }
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
        >
          { category.strCategory }
        </button>
      ))}
    </div>
  );
}

export default Drinks;
