import ImageGalleryItem from "../ImageGalleryItem";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images }) => {
  return (
    <ul className={styles.imageGallery}>
      <ImageGalleryItem images={images} />
    </ul>
  );
};

export default ImageGallery;
