import React from 'react';
import { ImSpinner } from 'react-icons/im';
import s from './Loader.module.css';

const Loader = ({ searchQuery }) => {
  return (
    <div role="alert">
      <div className={s.spinner}>
        <ImSpinner size="32" className={s.iconSpin} />
        <p className={s.spinnerQuery}>Loading {searchQuery}</p>
      </div>
    </div>
  );
};

export default Loader;
