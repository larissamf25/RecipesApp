import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import ShareImg from '../images/shareIcon.svg';
import FavoriteButton from './FavoriteButton';

const copy = require('clipboard-copy');

function SavedRecipes() {
  const { favoriteRecipesList, doneRecipesList } = useContext(RecipesContext);

  const { pathname } = useLocation();
  const currentList = pathname === '/done-recipes'
    ? doneRecipesList : favoriteRecipesList;

  const [shareClick, setShareClick] = useState('');
  const [filter, setFilter] = useState('All');

  const onShareClick = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setShareClick(id);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('All') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('food') }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drink') }
      >
        Drinks
      </button>
      <section>
        { (currentList && currentList.length !== 0) && currentList
          .filter((currentrecipe) => (
            filter === 'All' ? true : currentrecipe.type === filter
          ))
          .map((recipe, index) => {
            const { category, doneDate, nationality, id,
              alcoholicOrNot, image, name, tags, type } = recipe;
            return (
              <div key={ index }>
                <Link to={ `/${type}s/${id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    width="200px"
                    src={ image }
                    alt={ name }
                  />
                </Link>
                <Link to={ `/${type}s/${id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>
                    {name}
                  </p>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { alcoholicOrNot === ''
                    ? `${nationality} - ${category}`
                    : alcoholicOrNot }
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
                <button
                  type="button"
                  onClick={ () => onShareClick(type, id) }
                  style={ { margin: '20px' } }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ ShareImg }
                    alt="Share Recipe"
                  />
                </button>
                <FavoriteButton
                  recipe={ recipe }
                  dataTestId={ `${index}-horizontal-favorite-btn` }
                />
                {shareClick === id && <span data-testid="linkCopied">Link copied!</span>}
                { tags && (
                  <ul>
                    { tags.slice(0, 2).map((tag, idx) => (
                      <li
                        key={ idx }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) }
              </div>
            );
          }) }
      </section>
    </div>
  );
}

export default SavedRecipes;
