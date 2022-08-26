import React from 'react';
import { Link } from 'react-router-dom';
import { BsListCheck } from 'react-icons/bs';
import { FaCocktail } from 'react-icons/fa';
import { GiKnifeFork } from 'react-icons/gi';
import { FiHeart } from 'react-icons/fi';
// import drinkIcon from '../images/drinkIcon.svg';
// import mealIcon from '../images/mealIcon.svg';
import '../style/Footer.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="main-footer"
    >
      <Link
        to="/foods"
      >
        {/* <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="Meal Icon"
  /> */}
        <GiKnifeFork font-size="40px" color="black" />
      </Link>
      <Link
        to="/drinks"
      >
        {/* <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Drink Icon"
        /> */}
        <FaCocktail font-size="40px" color="black" />
      </Link>
      <Link
        to="/favorite-recipes"
      >
        <FiHeart font-size="40px" color="black" />
      </Link>
      <Link
        to="/done-recipes"
      >
        <BsListCheck font-size="40px" color="black" />
      </Link>
    </footer>
  );
}

export default Footer;
