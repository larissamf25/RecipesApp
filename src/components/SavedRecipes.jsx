import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiShareAlt } from 'react-icons/bi';
import '../style/SavedRecipes.css';
import RecipesContext from '../context/RecipesContext';
import saveLocalStore from '../pages/helpers/saveLocalStore';
import FavoriteButton from './FavoriteButton';
import Footer from './Footer';

const copy = require('clipboard-copy');

function SavedRecipes() {
  const { favoriteRecipesList, doneRecipesList,
    setDoneRecipesList } = useContext(RecipesContext);

  const { pathname } = useLocation();
  const currentList = pathname === '/done-recipes'
    ? doneRecipesList : favoriteRecipesList;

  const [filter, setFilter] = useState('All');
  const [shareClick, setShareClick] = useState('');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer > 0) setTimeout(() => setTimer(timer - 1), Number('1000'));
    console.log(timer);
  });

  const onShareClick = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setTimer(Number('3'));
    setShareClick(id);
  };

  const onDelete = (id) => {
    setDoneRecipesList(doneRecipesList.filter((rec) => rec.id !== id));
    saveLocalStore('doneRecipes', doneRecipesList.filter((rec) => rec.id !== id));
  };

  return (
    <div className="saved-recipes-page">
      <div className="btns-container">
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
      </div>
      <section className="recipes-container">
        { (currentList && currentList.length !== 0) && currentList
          .filter((currentrecipe) => (
            filter === 'All' ? true : currentrecipe.type === filter
          ))
          .map((recipe, index) => {
            const { category, doneDate, nationality, id,
              alcoholicOrNot, image, name, tags, type } = recipe;
            return (
              <div key={ index } className="recipe-card">
                <Link to={ `/${type}s/${id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ image }
                    alt={ name }
                  />
                </Link>
                <div className="recipe-infos">
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
                  {/* tags && (
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
                      ) */}
                  <div className="icons-container">
                    <FavoriteButton
                      recipe={ recipe }
                      dataTestId={ `${index}-horizontal-favorite-btn` }
                    />
                    <button
                      type="button"
                      onClick={ () => onShareClick(type, id) }
                    >
                      <BiShareAlt font-size="30px" color="black" />
                    </button>
                    { pathname === '/done-recipes' && (
                      <button
                        type="button"
                        onClick={ () => onDelete(id) }
                      >
                        <RiDeleteBin6Line font-size="30px" />
                      </button>
                    ) }
                  </div>
                  {(shareClick === id && timer !== 0)
                    && (
                      <span
                        data-testid="linkCopied"
                        id="new-copied-popUp"
                      >
                        Link copied!
                      </span>)}
                </div>
              </div>
            );
          }) }
      </section>
      <Footer />
    </div>
  );
}

export default SavedRecipes;
