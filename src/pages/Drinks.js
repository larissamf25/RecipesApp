import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DrinkCard from '../components/DrinkCard';
import RecipesContext from '../context/RecipesContext';
import fetchDrinkAPI from '../services/drinkAPI';
import { fetchRecipesByIngredient,
  fetchRecipesByLetter,
  fetchRecipesByName } from '../services/searchOptionsDrinks';

function Drinks() {
  const {
    searchBarOption,
    searchValue,
    setSearchBarOption } = useContext(RecipesContext);

  const [recipes, setRecipes] = useState(undefined);
  const [drinkList, setDrinkList] = useState([]);

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

  const verifyRecipesLength = () => {
    if (recipes === null) {
      setRecipes([]);
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } if (recipes.length === 1) {
      return <Redirect to={ `/drinks/${recipes[0].idDrink}` } />;
    }
    return recipes
      .slice(0, Number('12'))
      .map((drink, idx) => <DrinkCard key={ idx } drink={ drink } index={ idx } />);
  };

  return (
    <div>
      <Header />
      {
        (!recipes && recipes !== null)
          ? (
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
          : verifyRecipesLength()
      }
      <Footer />
    </div>
  );
}

export default Drinks;
