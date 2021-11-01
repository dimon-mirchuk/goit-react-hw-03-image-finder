import PropTypes from "prop-types";

const ImageGalleryItem = ({ id, webformatURL, largeImageURL }) => {
  return (
    <li className="ImageGalleryItem" key={id}>
      <img src={webformatURL} alt="" className="ImageGalleryItem-image" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
