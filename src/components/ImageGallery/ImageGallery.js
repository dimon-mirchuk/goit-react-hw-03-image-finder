import ImageGalleryItem from "../ImageGalleryItem";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, onClickImg }) => {
  return (
    <ul className={styles.imageGallery}>
      <ImageGalleryItem images={images} onClickImg={onClickImg} />
    </ul>
  );
};

export default ImageGallery;
