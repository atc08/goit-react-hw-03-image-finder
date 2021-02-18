import React from 'react';
import s from './LoadMoreButton.module.css';

const LoadMoreButton = ({ onClick, onScroll }) => {
  return (
    // scroll = () => {
    //   window.scrollTo({
    //     top: document.documentElement.scrollHeight,
    //     behavior: 'smooth',
    //   });
    // },
    <button
      type="button"
      className={s.LoadMoreButton}
      onClick={onClick}
      onScroll={e => onScroll(e)}
    >
      Load More
    </button>
  );
};

export default LoadMoreButton;
