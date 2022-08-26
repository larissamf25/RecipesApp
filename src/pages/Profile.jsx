import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../style/Profile.css';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const resetLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div>
      <Header />
      {
        (user)
          ? (
            <div className="profile-page">
              <span data-testid="profile-email">{user.email}</span>
              <Link
                to="/favorite-recipes"
                data-testid="profile-favorite-btn"
              >
                Favorite Recipes
              </Link>
              <Link
                to="/done-recipes"
                data-testid="profile-done-btn"
              >
                Done Recipes
              </Link>
              <Link
                to="/"
                data-testid="profile-logout-btn"
                onClick={ resetLocalStorage }
              >
                Logout
              </Link>
            </div>)
          : (
            <div className="profile-page">
              <button type="button">
                <Link
                  to="/"
                >
                  Logout
                </Link>
              </button>
            </div>)
      }
      <Footer />
    </div>
  );
}

export default Profile;
