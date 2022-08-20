import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import DrinkCard from '../components/DrinkCard';
import RecipesContext from '../context/RecipesContext';
import fetchDrinkAPI from '../services/drinkAPI';
import { fetchRecipesByIngredient,
  fetchRecipesByLetter,
  fetchRecipesByName } from '../services/searchOptionsDrinks';

function Drinks() {
  const { setDrinkList,
    drinkList, searchBarOption,
    searchValue, setSearchBarOption } = useContext(RecipesContext);

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const drinkListRequest = await fetchDrinkAPI();
      setDrinkList(drinkListRequest);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    if (searchBarOption.length > 0) {
      const verifySearchValue = async () => {
        if (searchBarOption === 'ingredientSearch') {
          setRecipes(await fetchRecipesByIngredient(searchValue));
        } if (searchBarOption === 'letterSearch') {
          setRecipes(await fetchRecipesByLetter(searchValue));
        } else {
          setRecipes(await fetchRecipesByName(searchValue));
        }
      };
      verifySearchValue();
      setSearchBarOption('');
    }
  }, [searchBarOption]);

  return (
    <div>
      <Header />
      {
        (recipes.length > 0)
          ? recipes.map((recipe) => (
            <div key={ recipe.idDrink }>
              <h1>{recipe.strDrink}</h1>
              <img src={ recipe.strDrinkThumb } alt={ recipe.strDrink } width="200px" />
            </div>
          ))
          : (
            <div>
              { drinkList
                .slice(0, Number('12'))
                .map((drink, idx) => (
                  <DrinkCard
                    key={ idx }
                    drink={ drink }
                    index={ idx }
                  />))}
            </div>)
      }
    </div>
  );
}

export default Drinks;
