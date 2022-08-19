import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { searchValue, setSearchValue } = useContext(RecipesContext);
  const [appersButton, setAppearsButton] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();

  const verifyTitle = () => {
    const title = (pathname.substring(1).replace('-', ' ')).split(' ');
    for (let i = 0; i < title.length; i += 1) {
      title[i] = title[i][0].toUpperCase() + title[i].substr(1);
    }
    return (title.toString().replace(',', ' '));
  };

  return (
    <header>
      <h1 data-testid="page-title">
        { verifyTitle() }
      </h1>

      {
        (pathname !== '/profile'
          && pathname !== '/done-recipes'
          && pathname !== '/favorite-recipes')
          ? (
            <div className="icons-container">
              <button
                type="button"
                data-testid="search-top-btn"
                onClick={ () => { setAppearsButton(!appersButton); } }
              >
                <img src={ searchIcon } alt="Search Icon" />
              </button>

              <button
                type="button"
                data-testid="profile-top-btn"
                onClick={ () => { history.push('/profile'); } }
              >
                <img src={ profileIcon } alt="Profile Icon" />
              </button>
            </div>)
          : (
            <button
              type="button"
              data-testid="profile-top-btn"
              onClick={ () => { history.push('/profile'); } }
            >
              <img src={ profileIcon } alt="Profile Icon" />
            </button>)
      }
      {
        appersButton
        && (
          <label htmlFor="searchInput">
            Search
            <input
              data-testid="search-input"
              id="searchInput"
              type="text"
              value={ searchValue }
              onChange={ ({ target }) => {
                setSearchValue(target.value);
              } }
            />
          </label>
        )
      }

    </header>
  );
}

export default Header;
