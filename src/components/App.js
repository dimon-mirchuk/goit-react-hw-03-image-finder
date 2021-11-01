import { Component } from "react";
import "./App.css";
import * as api from "../Service/ServiceAPI";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";

const INITIAL_STATE = { page: 1, images: [], query: "" };

class App extends Component {
  state = {
    ...INITIAL_STATE,
    largeImageURL: "",
    isLoading: false,
  };

  componentDidMount() {
    const { query, page } = this.state;
    this.getImages(query, page);
  }

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    if (prevState.query !== query) {
      this.getImages({ query, page: 1 });
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.getImages();
  };

  pushImagesToState = (response) => {
    const imagesFromResponse = response.data.hits;
    let newSearchArray = [];
    newSearchArray = [...this.state.images, ...imagesFromResponse];
    this.setState(({ images }) => ({ images: newSearchArray }));
  };

  getImages = (query, page) => {
    this.setState({ isLoading: true });
    api
      .getImages(query, page)
      .then((response) => this.pushImagesToState(response))
      .catch(() => {
        console.log("Wops, something went wrong. Please try again later");
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  onLoadMore = () => {
    let { page } = this.state;
    page += 1;
    this.setState({ page });
  };

  render() {
    const { images } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery images={images} />;
      </>
    );
  }
}

export default App;
