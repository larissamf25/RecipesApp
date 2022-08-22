import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const { setSearchBarOption, searchValue, setSearchValue } = useContext(RecipesContext);

  const verifyLetter = () => {
    const selectedOption = document
      .querySelector('input[name="radioOption"]:checked').value;
    if (searchValue.length !== 1) {
      setSearchValue('');
      return global.alert('Your search must have only 1 (one) character');
    }
    setSearchBarOption(selectedOption);
  };

  const handleRadioOption = () => {
    const selectedOption = document
      .querySelector('input[name="radioOption"]:checked').value;
    if (selectedOption === 'letterSearch') {
      verifyLetter();
    }
    setSearchBarOption(selectedOption);
  };

  return (
    <div className="searchbar-container">
      <form>
        <label htmlFor="ingredient-search">
          Ingredient
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            value="ingredientSearch"
            id="ingredient-search"
            name="radioOption"
          />
        </label>

        <label htmlFor="name-search">
          Name
          <input
            type="radio"
            data-testid="name-search-radio"
            value="nameSearch"
            id="name-search"
            name="radioOption"
          />
        </label>

        <label htmlFor="letter-search">
          First Letter
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            value="letterSearch"
            id="letter-search"
            name="radioOption"
          />
        </label>
      </form>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleRadioOption }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
