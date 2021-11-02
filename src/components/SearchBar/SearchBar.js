import { Component } from "react";
import { toast } from "react-toastify";

class SearchBar extends Component {
  state = {
    query: "",
  };

  handleChange = (e) => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.query.trim() === "") {
      toast.error("Please enter the name of the request");
      return;
    }

    this.props.onSubmit(this.state.query);
    console.log(this.state.query);
    this.setState({ query: "" });
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
