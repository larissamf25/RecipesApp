import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ShareImg from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton() {
  const [shareClick, setShareClick] = useState(false);
  const { pathname } = useLocation();
  const ajustedPath = pathname.replace('/in-progress', '');
  const onShareClick = () => {
    copy(`http://localhost:3000${ajustedPath}`);
    setShareClick(true);
  };
  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ onShareClick }
        style={ { margin: '20px' } }
      >
        <img src={ ShareImg } alt="Share Recipe" />
      </button>
      {shareClick && <span>Link copied!</span>}
    </>
  );
}

export default ShareButton;
