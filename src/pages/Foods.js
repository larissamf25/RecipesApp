import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { fetchRecipesByIngredient,
  fetchRecipesByLetter,
  fetchRecipesByName } from '../services/searchOptionsFoods';
import fetchFoodAPI from '../services/foodAPI';
import FoodCard from '../components/FoodCard';

function Foods() {
  const {
    searchBarOption,
    searchValue,
    setSearchBarOption } = useContext(RecipesContext);

  const [foodList, setFoodList] = useState([]);
  const [recipes, setRecipes] = useState(undefined);

  useEffect(() => {
    const fetchAPI = async () => {
      const foodListRequest = await fetchFoodAPI();
      setFoodList(foodListRequest);
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
      return <Redirect to={ `/foods/${recipes[0].idMeal}` } />;
    }
    return recipes
      .slice(0, Number('12'))
      .map((food, idx) => <FoodCard key={ idx } food={ food } index={ idx } />);
  };

  return (
    <div>
      <Header />
      {
        (!recipes && recipes !== null)
          ? (
            <div>
              { foodList
                .slice(0, Number('12'))
                .map((food, idx) => <FoodCard key={ idx } food={ food } index={ idx } />)}
            </div>)
          : verifyRecipesLength()
      }
      <Footer />
    </div>
  );
}
export default Foods;
