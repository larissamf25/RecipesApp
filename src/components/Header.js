import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [appersButton, setAppearsButton] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();

  return (
    <header>
      <h1 data-testid="page-title">
        { pathname.substring(1).toUpperCase()}
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
                onClick={ setAppearsButton(!appersButton) }
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

    </header>
  );
}

export default Header;
