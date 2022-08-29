import React from 'react';
import { Link } from 'react-router-dom';
import '../style/NotFound.css';

function NotFound() {
  return (
    <div className="notFound-page">
      <div className="notFound-container">
        <span>404</span>
        <p>Sorry, page not found!</p>
        <Link to="/">
          <button type="button">
            Go to login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
