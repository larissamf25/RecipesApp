import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import DrinkCard from '../components/DrinkCard';
import RecipesContext from '../context/RecipesContext';
import fetchDrinkAPI from '../services/drinkAPI';

function Drinks() {
  const { setDrinkList, drinkList } = useContext(RecipesContext);
  useEffect(() => {
    const fetchAPI = async () => {
      const drinkListRequest = await fetchDrinkAPI();
      setDrinkList(drinkListRequest);
    };
    fetchAPI();
  }, []);
  return (
    <div>
      <Header />
      { drinkList
        .slice(0, Number('12'))
        .map((drink, idx) => <DrinkCard key={ idx } drink={ drink } index={ idx } />)}
    </div>
  );
}

export default Drinks;
