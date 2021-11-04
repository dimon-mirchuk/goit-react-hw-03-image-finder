import PropTypes from "prop-types";
import styles from "./Button.module.css";

const { wrapper, button } = styles;

const Button = ({ getImages, children }) => (
  <div className={wrapper}>
    <button type="button" className={button} onClick={getImages}>
      {children}
    </button>
  </div>
);

Button.propTypes = {
  getImages: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
