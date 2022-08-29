import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BiShareAlt } from 'react-icons/bi';
import { useEffect } from 'react';

const copy = require('clipboard-copy');

function ShareButton() {
  const [shareClick, setShareClick] = useState(false);
  const [timer, setTimer] = useState(0);
  const { pathname } = useLocation();
  const ajustedPath = pathname.replace('/in-progress', '');
  const onShareClick = () => {
    copy(`http://localhost:3000${ajustedPath}`);
    setTimer(Number('3'));
    setShareClick(true);
  };

  useEffect(() => {
    if (timer > 0) setTimeout(() => setTimer(timer - 1), Number('1000'));
  });

  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ onShareClick }
        style={ { margin: '20px' } }
      >
        <BiShareAlt fontSize="30px" color="black" />
      </button>
      {(shareClick && timer !== 0) && <span id="copied-popUp">Link copied!</span>}
    </>
  );
}

export default ShareButton;
