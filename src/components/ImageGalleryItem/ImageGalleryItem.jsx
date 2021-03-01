import React from 'react';
import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ url, alt, largeUrl, onOpenModal }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItemImage}
        src={url}
        alt={alt}
        data-url={largeUrl}
        width="300"
        onClick={onOpenModal}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeUrl: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
