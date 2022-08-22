import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import RecipesContext from '../context/RecipesContext';
import { fetchFoodAPI,
  fetchFoodAPIByCategory,
  fetchFoodCategories } from '../services/foodAPI';
import '../css/Foods.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRecipesByIngredient,
  fetchRecipesByLetter,
  fetchRecipesByName } from '../services/searchOptionsFoods';

function Foods() {
  const {
    foodList,
    setFoodList,
    foodCategories,
    setFoodCategories,
    searchBarOption,
    searchValue,
    setSearchBarOption } = useContext(RecipesContext);

  // const [foodList, setFoodList] = useState([]);
  const [recipes, setRecipes] = useState(undefined);
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
      {
        (!recipes && recipes !== null)
          ? (
            <div>
              { localFoodList.map((food, idx) => (
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
            </div>)
          : verifyRecipesLength()
      }
      <Footer />
    </div>
  );
}

export default Foods;
