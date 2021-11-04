import PropTypes from "prop-types";
import styles from "./SearchBar.module.css";
import SearchForm from "../SearchForm";

const SearchBar = ({ onSubmit }) => {
  return (
    <header className={styles.Searchbar}>
      <SearchForm onSubmit={onSubmit} />
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
