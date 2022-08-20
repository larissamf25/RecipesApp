import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../style/Footer.css';

function Footer() {
  const history = useHistory();

  const toDrinksPage = () => {
    history.push('/drinks');
  };

  const toFoodsPage = () => {
    history.push('/foods');
  };

  return (
    <footer
      data-testid="footer"
      className="main-footer"
    >
      <button
        type="button"
        onClick={ toDrinksPage }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Drink Icon"
        />
      </button>
      <button
        type="button"
        onClick={ toFoodsPage }
      >
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="Meal Icon"
        />
      </button>
    </footer>
  );
}

export default Footer;
