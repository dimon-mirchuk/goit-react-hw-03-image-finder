import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.css";

const { imageGalleryItem, imageGalleryItemImage } = styles;

const ImageGalleryItem = ({ images, onClickImg }) => {
  return (
    <>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <li className={imageGalleryItem} key={id}>
          <img
            src={webformatURL}
            alt=""
            className={imageGalleryItemImage}
            onClick={() => onClickImg({ largeImageURL })}
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default ImageGalleryItem;
