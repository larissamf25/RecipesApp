import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [searchValue, setSearchValue] = useState('');
  const [searchBarOption, setSearchBarOption] = useState('');
  return (
    <RecipesContext.Provider
      value={ {
        searchValue,
        searchBarOption,
        setSearchValue,
        setSearchBarOption,
      } }
    >
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
