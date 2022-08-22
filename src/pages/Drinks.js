import React, { useContext, useEffect, useState } from 'react';
import DrinkCard from '../components/DrinkCard';
import RecipesContext from '../context/RecipesContext';
import { fetchDrinkAPI,
  fetchDrinkAPIByCategory,
  fetchDrinkCategories } from '../services/drinkAPI';
import '../css/Drinks.css';
import { Link } from 'react-router-dom';

function Drinks() {
  const {
    setDrinkList,
    drinkList,
    drinkCategories,
    setDrinkCategories,
  } = useContext(RecipesContext);
  const [localDrinkList, setLocalDrinkList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('All');
  useEffect(() => {
    const fetchAPI = async () => {
      const drinkListRequest = await fetchDrinkAPI();
      setDrinkList(drinkListRequest);
      const drinkCategoriesRequest = await fetchDrinkCategories();
      setDrinkCategories(drinkCategoriesRequest);
      setLocalDrinkList(drinkListRequest.slice(0, Number('12')));
    };
    fetchAPI();
  }, []);

  const categoryFilter = async ({ target }) => {
    const category = target.name;
    if (category === 'All') {
      setLocalDrinkList(drinkList.slice(0, Number('12')));
      setCurrentCategory('All');
    } else {
      const filterdDrinkList = await fetchDrinkAPIByCategory(category);
      console.log(filterdDrinkList);
      setLocalDrinkList(filterdDrinkList.slice(0, Number('12')));
      setCurrentCategory(category);
    }
  };

  return (
    <div>
      { localDrinkList
        .map((drink, idx) => (
          <div key={ idx }>
            <Link to={ `/drinks/${drink.idDrink}` }>
              <DrinkCard drink={ drink } index={ idx } />
            </Link>
          </div>
        ))}
      <div className="categories-container">
        { drinkCategories.slice(0, Number('5')).map((category, idx) => (
          <button
            key={ idx }
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            name={ category.strCategory }
            onClick={ categoryFilter }
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

export default Drinks;
