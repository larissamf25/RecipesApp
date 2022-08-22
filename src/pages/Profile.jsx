import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const resetLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div>
      {
        (user)
          ? (
            <div>
              <Header />
              <h1>Profile</h1>
              <span data-testid="profile-email">{user.email}</span>
              <Link
                to="/done-recipes"
                data-testid="profile-done-btn"
              >
                Done Recipes
              </Link>
              <Link
                to="/favorite-recipes"
                data-testid="profile-favorite-btn"
              >
                Favorite Recipes
              </Link>
              <Link
                to="/"
                data-testid="profile-logout-btn"
                onClick={ resetLocalStorage }
              >
                Logout
              </Link>
              <Footer />
            </div>
          )
          : <div>
            <Header />
            <h1>Profile</h1>
            <Link
              to="/"
            >
              Logout
            </Link>
          </div>
      }
    </div>
  );
}

export default Profile;
