import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { fetchRecipesByIngredient,
  fetchRecipesByLetter,
  fetchRecipesByName } from '../helper/searchOptions';

function Foods() {
  const { searchBarOption, searchValue } = useContext(RecipesContext);
  // const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const verifySearchValue = () => {
      if (searchBarOption === 'ingredientSearch') {
        setRecipes(fetchRecipesByIngredient(searchValue));
      } if (searchBarOption === 'ingredientSearch') {
        setRecipes(fetchRecipesByLetter(searchValue));
      }
      setRecipes(fetchRecipesByName(searchValue));
    };
    verifySearchValue();
  }, [searchBarOption]);

  // console.log(recipes);
  return (
    <div>
      <Header />
      <h1>Foods Page</h1>
      {/* {
        (recipes.length !== 0)
         && recipes.map((recipe) => (
           <div key={ recipe.idMeal }>
             <h1>{recipe.strMeal}</h1>
             <img src={ recipe.strMealThumb } alt={ recipe.strMeal } />
           </div>
         ))
      } */}
    </div>
  );
}

export default Foods;
