import React from 'react';
import css from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <div className={css.loadBtnContainer}>
      <button className={css.loadeButton} type="button" onClick={onClick}>
        Load More
      </button>
    </div>
  );
};

export { Button };