import React from 'react';
import s from './LoadMoreButton.module.css';

const LoadMoreButton = ({ onClick }) => {
  return (
    <button type="button" className={s.LoadMoreButton} onClick={onClick}>
      Load More
    </button>
  );
};

export default LoadMoreButton;
