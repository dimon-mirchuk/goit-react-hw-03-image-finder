import { Component } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import * as api from "../Service/ServiceAPI";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import mapper from "../helpers/Mapper";

class App extends Component {
  state = {
    page: 1,
    images: [],
    query: "",
    largeImageURL: "",
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.getImages();
    }
  }

  onChangeQuery = (query) => {
    console.log(query);
    this.setState({ query });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.getImages();
  };

  getImages = () => {
    const { page, query } = this.state;
    console.log(query);
    console.log(page);

    this.setState({
      isLoading: true,
    });
    api
      .getImages({ query, page })
      .then((response) => {
        console.log(query);
        console.log(page);
        console.log(response);
        this.setState((prevState) => ({
          images: [...prevState.images, ...mapper(response)],
          page: prevState.page + 1,
        }));
      })
      .catch((error) => this.setState({ error: error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { images } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.onChangeQuery} />
        <ImageGallery images={images} />;
        <ToastContainer />
      </>
    );
  }
}

export default App;
