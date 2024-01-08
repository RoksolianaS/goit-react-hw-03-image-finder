import React from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={css.imageGallery}>
      {Array.isArray(images) &&
        images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onClick={() => onImageClick(image.largeImageURL)}
            />
          );
        })}
    </ul>
  );
};
export { ImageGallery };