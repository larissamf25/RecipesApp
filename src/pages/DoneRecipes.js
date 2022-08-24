import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareImg from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [doneRecipesList, setDoneRecipesList] = useState([]);
  const [shareClick, setShareClick] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setDoneRecipesList(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  const onShareClick = (type, id) => {
    copy(`http://localhost:3000/${type}/${id}`);
    setShareClick(true);
  };

  return (
    <div>
      <Header />
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
        onClick={ () => setFilter('foods') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drinks') }
      >
        Drinks
      </button>
      <section>
        { doneRecipesList
          .filter((currentrecipe) => (
            filter === 'All' ? true : currentrecipe.type === filter
          ))
          .map((recipe, index) => {
            const { category, doneDate, nationality, id,
              image, name, tags, type } = recipe;
            return (
              <div key={ index }>
                <Link to={ `/${type}/${id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    width="200px"
                    src={ image }
                    alt={ name }
                  />
                </Link>
                <Link to={ `/${type}/${id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>
                    {name}
                  </p>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${nationality} - ${category}`}
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
                {shareClick && <span>Link copied!</span>}
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
              </div>
            );
          }) }
      </section>
    </div>
  );
}

export default DoneRecipes;
