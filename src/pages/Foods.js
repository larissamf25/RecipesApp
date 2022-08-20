import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { fetchRecipesByIngredient,
  fetchRecipesByLetter,
  fetchRecipesByName } from '../services/searchOptionsFoods';
import FoodCard from '../components/FoodCard';
import fetchFoodAPI from '../services/foodAPI';

function Foods() {
  const { searchBarOption,
    searchValue, setFoodList, foodList, setSearchBarOption } = useContext(RecipesContext);
  const [recipes, setRecipes] = useState([]);

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
          setSearchBarOption('');
        } if (searchBarOption === 'ingredientSearch') {
          setRecipes(await fetchRecipesByLetter(searchValue));
          setSearchBarOption('');
        }
        setRecipes(await fetchRecipesByName(searchValue));
        setSearchBarOption('');
      };
      verifySearchValue();
    }
  }, [searchBarOption]);

  return (
    <div>
      <Header />
      <h1>Foods Page</h1>
      {
        (recipes.length > 0)
          ? recipes.map((recipe) => (
            <div key={ recipe.idMeal }>
              <h1>{recipe.strMeal}</h1>
              <img src={ recipe.strMealThumb } alt={ recipe.strMeal } width="200px" />
            </div>
          ))
          : (
            <div>
              { foodList
                .slice(0, Number('12'))
                .map((food, idx) => <FoodCard key={ idx } food={ food } index={ idx } />)}
            </div>)
      }
    </div>
  );
}
export default Foods;
