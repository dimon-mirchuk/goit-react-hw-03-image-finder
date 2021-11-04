import { Component } from "react";
import { toast } from "react-toastify";
import styles from "./SearchForm.module.css";

const { searchForm, searchFormButton, searchFormInput, searchFormButtonLabel } =
  styles;

class SearchForm extends Component {
  state = {
    query: "",
  };

  handleChange = (e) => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { query } = this.state;

    if (query.trim() === "") {
      toast.error("Please enter the name of the request");
      return;
    }

    this.props.onSubmit(query);
    this.setState({ query: "" });
  };
  render() {
    const { query } = this.state;
    return (
      <form className={searchForm} onSubmit={this.handleSubmit}>
        <button type="submit" className={searchFormButton}>
          <span className={searchFormButtonLabel}>Search</span>
        </button>
        <input
          className={searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default SearchForm;
