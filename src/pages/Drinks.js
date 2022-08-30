import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import DrinkCard from '../components/DrinkCard';
import RecipesContext from '../context/RecipesContext';
import { fetchDrinkAPI,
  fetchDrinkAPIByCategory,
  fetchDrinkCategories } from '../services/drinkAPI';
import '../style/Recipes.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRecipesByIngredient,
  fetchRecipesByLetter,
  fetchRecipesByName } from '../services/searchOptionsDrinks';

function Drinks() {
  const {
    setDrinkList,
    drinkList,
    drinkCategories,
    setDrinkCategories,
    searchBarOption,
    searchValue,
    setSearchBarOption,
  } = useContext(RecipesContext);
  const [localDrinkList, setLocalDrinkList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('All');
  const [recipes, setRecipes] = useState(undefined);

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
    if (category === 'All' || category === currentCategory) {
      setLocalDrinkList(drinkList.slice(0, Number('12')));
      setCurrentCategory('All');
    } else {
      const filterdDrinkList = await fetchDrinkAPIByCategory(category);
      setLocalDrinkList(filterdDrinkList.slice(0, Number('12')));
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
      return <Redirect to={ `/drinks/${recipes[0].idDrink}` } />;
    }
    return recipes
      .slice(0, Number('12'))
      .map((drink, idx) => (
        <div className="recipe-card" key={ idx }>
          <Link to={ `/drinks/${drink.idDrink}` }>
            <DrinkCard drink={ drink } index={ idx } />
          </Link>
        </div>
      ));
  };

  return (
    <div className="recipes-page">
      <Header />
      <div className="categories-container">
        <button
          type="button"
          name="All"
          onClick={ categoryFilter }
          id={ currentCategory === 'All'
            && 'category-selected' }
          data-testid="All-category-filter"
        >
          All
        </button>
        { drinkCategories.slice(0, Number('5')).map((category, idx) => (
          <button
            key={ idx }
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            id={ currentCategory === category.strCategory
              && 'category-selected' }
            name={ category.strCategory }
            onClick={ categoryFilter }
          >
            { category.strCategory }
          </button>
        ))}
      </div>
      {
        (!recipes && recipes !== null)
          ? (
            <div className="recipes-container">
              { localDrinkList.map((drink, idx) => (
                <div className="recipe-card" key={ idx }>
                  <Link to={ `/drinks/${drink.idDrink}` }>
                    <DrinkCard drink={ drink } index={ idx } />
                  </Link>
                </div>
              ))}
            </div>)
          : <div className="recipes-container">{verifyRecipesLength()}</div>
      }
      { }
      <Footer />
    </div>
  );
}

export default Drinks;
