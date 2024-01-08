import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li key={image.id} className={css.ImageGalleryItem}>
      <img
        src={image.webformatURL}
        alt={image.id}
        onClick={onClick}
        className={css.ImageGalleryItem_image}
      />
    </li>
  );
};

export { ImageGalleryItem };